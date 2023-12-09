import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { doc, collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Generate the special stripe secret which allows charging a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in subunits (cents, pennies)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
  
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded
      return;
    }
  
    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
  
      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        // PaymentIntent successful
        setError(null);
        setProcessing(false);
  
        // Ensure all properties in order are defined
        const filteredBasket = basket.filter(item => (
          item.id && item.title && item.image && item.price && item.rating
        ));
  
        const order = {
          basket: filteredBasket,
          amount: payload.paymentIntent.amount,
          created: payload.paymentIntent.created
        };
  
        const ordersCollectionRef = collection(db, 'users', user?.uid, 'orders');
        await addDoc(ordersCollectionRef, order);
  
        dispatch({ type: 'EMPTY_BASKET' });
        history.toString().replace('/orders');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('There was an issue with processing your payment');
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
            </h1>


            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>

            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
        

            {/* Payment section - Payment method */}
            <div className='payment__section'>
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                              {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                </div>
            </div>
        </div>
    </div>
);
}

export default Payment;
