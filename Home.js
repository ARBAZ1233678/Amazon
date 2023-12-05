import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img 
                className='home__image' 
                src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
                alt=''
            />
            <div className='home__row'>
                <Product 
                    title='Chandelier Ceiling Lamp ' 
                    price={6495} 
                    image='https://m.media-amazon.com/images/I/A1DJoJwO2cL._AC._SR360,460.jpg'
                    
                    rating={4}
                />
                
                <Product 
                    title='GUESS 46mm Multifunction Stainless Steel Watch' 
                    price={11773} 
                    image='https://m.media-amazon.com/images/I/61cseTjpRnL._SX385_.jpg'
                    rating={4}
                />
              

            </div>
            <div className='home__row'>
            <Product 
                    title='Universal Travel Adapter, International All in One Worldwide Travel Adapter and Wall Charger ' 
                    price={587} 
                    image='https://m.media-amazon.com/images/I/611RCy1XjsL._SY741_.jpg'
                    rating={4}
                />
                <Product 
                    title='Dennis Lingo Mens Shirt ' 
                    price={599} 
                    image='https://m.media-amazon.com/images/I/61zPqokEDSL._SY606_.jpg'
                    rating={4}
                />
                <Product 
                    title='TUSA Digital Tyre Inflator for Car - 12V DC Portable Air Compressor Pump with LED Light' 
                    price={1067} 
                    image='https://m.media-amazon.com/images/I/41ZaAX2hDvL._SX300_SY300_QL70_FMwebp_.jpg'
                    rating={4}
                />

            </div>
            <div className='home__row'>
            <Product 
                    title='Nu 140 cm (55 inch) WebOS Series 4K Ultra HD Smart LED TV LED55UWA1 (Black) 2023 Model' 
                    price={133990} 
                    image='https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
                    rating={4}
                />

            </div>

        </div>
      
    </div>
  )
}

export default Home
