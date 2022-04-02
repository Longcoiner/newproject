import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../Error/Error";
import HomePage from "./HomePage";



function ProductCart(){
    const [product,setProduct]=useState({})
    const [errors,setError]=useState({})
    useEffect(()=>{
        const take=JSON.parse(localStorage.getItem('ProductList'))
        // console.log(take)
        axios.post('http://localhost:8080/laravel/public/api/product/cart',take)
        .then((res)=>{
            // console.log(res)
            if(res.data.errors){
                setError(res.data.errors)
            }else{
                setProduct(res.data.data) 
                
            }
        })
        .catch(error=>console.log(error))

    },[])
    // console.log(product)
    function fetchDataProduct(){
        if(product&& product.length>0){
            return product.map((value,key) => {
                let tong=0;
                let img =JSON.parse(product[key]['image'])
                let total=value.price* value.qty
                tong+=total

                return(
                
                    <tr id={product[key]['id']} >
                        <td> 
                            <a href=''>
                                <img className="size1" src={'http://localhost:8080/laravel/public/upload/user/product/'+product[key]['id_user']+ '/'+ img[0]} alt='' />
                            </a>
                        </td>
                        <td>
                            <h4>{product[key]['name']}</h4>
                            <p>web ID:12345</p>
                        </td>
                        <td>
                            <p>${product[key]['price']}</p>
                        </td>
                        <td>
                            <div className="button_cart_quanity">
                                    <a id={product[key]['id']} title={product[key]['qty']}   className="cart_quanity_up" onClick={handleUpCart}>+</a>
                                    <input type='text' className="cart_quanity_input" name='quanity' value={product[key]['qty']} autoComplete="off" size='2'  ></input>
                                    <a id={product[key]['id']} title={product[key]['qty']} className="cart_quanity_down" onClick={handleDownCart}>-</a>
                            </div> 
                        </td>
                        <td>
                          
                            <p className="cart_total_price" >${product[key]['price']*product[key]['qty']}</p>
                        </td>
                        <td>
                            <a id={product[key]['id']} className="cart_quanity_delete" onClick={handleRemoveItem} >X</a>
                        </td>
                       
                    </tr>
                   
                )
            })
        }
    }
    function fetchDateTotalPrice(){
        // console.log(product)
        let tong=0;
        if(product&&product.length){
             product.map((value,key)=>{
              
                
                let total=value.price* value.qty
                tong+=total
                console.log(tong)
               
            })
            return(
                <>
                      <li>Total <span className="total_last">${tong}</span></li>
                </>
            )
        }
        
    }
    
    const handleUpCart=(e)=>{
        const id=e.target.id
        let getQty=e.target.title
        let newAmount = [];
        // thêm biến map vào mảng array
            product.map((value,key) => {
                // console.log(value)
                if(id==value.id){
                    value.qty = value.qty + 1 
                }
                newAmount.push(value)
            })
            setProduct(newAmount)

         console.log(newAmount)
        const take=JSON.parse(localStorage.getItem('ProductList'))
        if(take){
             Object.keys(take).map((key,value)=>{   
                if(id==key){
                   take[key]= take[key] + 1
                   getQty=take[key]
                }
                localStorage.setItem('ProductList',JSON.stringify(take))
            })
        }
        
    }



   const handleDownCart=(e)=>{
        const id=e.target.id
        let getQty =e.target.title
        let newAmount=[]
        const take=JSON.parse(localStorage.getItem('ProductList'))

        if(getQty <= 1) {
            product.map((value,key)=>{
                if(id==value.id){
                    delete product[key]
                }
            }) 
            
            Object.keys(take).map((key,value)=>{
                if(id==key){
                  delete take[key]
                }
            })
        }
      


        product.map((value,key)=>{
            if(id==value.id){
                value.qty = value.qty - 1  
            }
            newAmount.push(value)
            console.log(value)
        })
        setProduct(newAmount)
        if(take){
             Object.keys(take).map((key,value)=>{
                if(id==key){
                   take[key]= take[key] - 1
                   getQty=take[key]
                }
                
            })
            
        }
        localStorage.setItem('ProductList',JSON.stringify(take))
   }



   const handleRemoveItem=(e)=>{
        const id=e.target.id
        let newAmount = [];
        const take=JSON.parse(localStorage.getItem('ProductList'))
           

        if(take){
            product.map((value,key) => {
               
                if(id==value.id){
                    delete product[key]
                }
            })
            Object.keys(take).map((key,value)=>{
                if(id==key){
                  delete take[key]
                }
            })
        }
        product.map((value,key) => {
            delete product[key]
            newAmount.push(value)
        })
        setProduct(newAmount)

            localStorage.setItem('ProductList',JSON.stringify(take))

   }

    return(
        <>
        <Error errors={errors} />
        
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>Descreption</td>
                        <td>Price</td>
                        <td>Quanity</td>
                        <td>Total</td>
                        <td></td>
                    </tr>
                </thead>
               
                {fetchDataProduct()}
            </table>
            <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes</a>
                <a className="btn btn-default check_out" href>Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>$59</span></li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  {fetchDateTotalPrice()}
                </ul>
                <a className="btn btn-default update" href="#">Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div>
            </div>
          </div>
        </div>
            </section>{/*/#do_action*/}
            <HomePage/>
        </div>
        </>
    )
}
export default ProductCart;