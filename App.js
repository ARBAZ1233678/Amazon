import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';
import {auth} from './firebase'
import { useStateValue } from "./StateProvider";
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise=loadStripe('pk_test_51OKPAHSGFlTuqfowSayhdV1Tn9TJNaZHCRKfJIOMW07PPbSAXbxQoBv45Bwa1myIaiC6MfWhjsTvSXjl7PdP19Oo00MHrCzUqH')


function App() {
  const [{}, dispatch] = useStateValue();
   
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  
  return (
    <Router>
      <div className="app">
      
        <Routes>
            <Route path="/checkout" element={<><Header /><Checkout/></>} />
            <Route path="/login" element={<><Login/></>} />
            <Route path="/orders" element={<><Header /><Orders/></>} />
            <Route path="/payment" element={<><Header/><Elements stripe={promise}><Payment/></Elements></>} />
            <Route path='' element={<><Header /><Home /></>} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
