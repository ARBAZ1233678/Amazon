import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from '@material-ui/icons';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  return (
    <div className='header'>
        <img 
            className='header_logo'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiTcDMpiVe0pSutnR0YWOXy3rIIBVpJzuHRA&usqp=CAU"  />

        <div className='header_search'>
            <input
                className='header_searchInput' type='text'/>
            <SearchIcon className='header_searchIcon'/>
            
           
        </div>

        <div className='header_nav'>
             
              <div className='header_option'>

                   <span className='header_optionLineOne'>
                    Hello Guest</span>
                    <span className='header_optionLineTwo'>
                    Sign in</span>

               </div>
              <div className='header_option'>
                   <span className='header_optionLineOne'>
                    Returns</span>
                   <span className='header_optionLineTwo'>
                    & Orders</span>

              </div>
              <div className='header_option'>
                    <span className='header_optionLineOne'>
                    Your</span>
                    <span className='header_optionLineTwo'>
                    Prime</span>
              </div> 
              <div className='header_optionBasket'>
                    <ShoppingCartIcon/>
                    <span className='header_optionLineTwo 
                    header_basketCount'>0</span>

              </div>
  
             

                
              
         </div>
        
      
     </div>
    
  );
}

export default Header
