import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Blog from './components/Blog/Blog'
import Detail from './components/Blog/Detail';
import Login from './components/Member/Login';
import Home from './Home'
import Update from './components/Member/Update';
import UserProduct from './components/Product/UserProduct';
import CreateProduct from './components/Product/CreateProduct';
import EditProduct from './components/Product/EditProduct';
import ProductDetail from './components/Product/ProductDetail';
import ProductCart from './components/Product/ProductCart';
import Wishlist from './components/Product/Wishlist';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App>
              <Routes>
                  <Route exact  path='/' element={<Home/>}/>
                  <Route  path='/login' element={<Login/>}/>
                  <Route path='/update' element={<Update/>}/>
                  <Route index path='/blog/list' element={<Blog/>}/>
                  <Route  path='/blog/detail/:id' element={<Detail/>}/>
                  <Route  path='/user/add-product' element={<UserProduct/>}/>
                  <Route  path='/create/product' element={<CreateProduct/>}/>
                  <Route  path='/edit/product/:id' element={<EditProduct/>}/>
                  <Route path='/product/detail/:id' element={<ProductDetail/>}/>
                  <Route path='/product/cart' element={<ProductCart/>}/>
                  <Route path='/product/wishlist' element={<Wishlist/>}/>
              </Routes>
          </App>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
