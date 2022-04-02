import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { Link } from "react-router-dom";




function UserProduct(){
        const navigate=useNavigate();
        const [product,setProduct]=useState({});
        const [error,setError]=useState({})
       
       



        function handleRemoveItem(e){
           let value=e.target.value
           let accessToken=JSON.parse(localStorage['token'])
           let config={
            headers:{
                'Authorization': 'Bearer '+ accessToken,
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
            };
            axios.get('http://localhost:8080/laravel/public/api/user/delete-product/'+value,config)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                    setProduct(res.data.data)
                }
            })
        }
        // console.log( deleteProduct)
        
        useEffect(() => {
            let getLocal=JSON.parse(localStorage.getItem('auth'))
            // console.log(getLocal.id)
            let accessToken=JSON.parse(localStorage['token'])
            // console.log(accessToken)
            let config={
                headers:{
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            // console.log(config)
            axios.get('http://localhost:8080/laravel/public/api/user/my-product',config)
                .then(res => {
                //    console.log(res.data.data)
                   if(res.data.errors){
                       setError(res.data.errors)
                   }else{
                       setProduct(res.data.data)
                   }
                })
                .catch(error => console.log(error))
        }, [])

        function fetchDataTable(){
            let getLocal=JSON.parse(localStorage.getItem('auth'))
            if(product && Object.keys(product).length >0){
                return Object.keys(product).map((key,value)=>{
                    // console.log(product[key]['id'])
                    // console.log(value.id)
                    // console.log(typeof(product[key]['image']))
                    let image=JSON.parse(product[key]['image'])

                    return(
                        <>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>image</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        <tr id=''>
                            <td>{product[key]['id']}</td>
                            <td>{product[key]['name']}</td>
                            <td > <img className="size" src={'http://localhost:8080/laravel/public/upload/user/product/'+getLocal.id +"/"+image} alt="" /></td>
                            <td>{product[key]['price']}</td>
                            <td>
                                <th><Link to={'/edit/product/'+ product[key]['id']}><i class="fa fa-file icoin-space"></i></Link> </th>
                                <th >
                                <button onClick={handleRemoveItem} value={product[key]['id']}  type="button">Delete</button>
                                </th>
                            </td>
                        </tr>
                       
                       
                        </>
                    )
                  
                })
            
            }
           
        }

        function handleAddProduct(){
            navigate("/create/product");
        }
        

    return(
        <>
            {fetchDataTable()}
           <button  className="btn btn-default" onClick={handleAddProduct}>Add New</button>
        </>
    )
}
export default UserProduct