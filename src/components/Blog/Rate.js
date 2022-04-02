


import axios from "axios";
import React , { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';
import { useParams } from "react-router-dom"
import Error from "../Error/Error";



function Rate(){
//   let params=useParams();
  
//   const [rating,setRating]=useState(0);
//   const [error,setErrors]=useState({});
//   const [msgRate,setMsgRate]=useState('')
//   let tong=0;
//   let average=0;
//   useEffect (()=>{
//     axios.get('http://localhost:8080/laravel/public/api/blog/rate/' +params.id)
//     .then (res=>{
//         console.log(res.data.data)
//         console.log(Object.keys(res.data.data).length)
//         Object.keys(res.data.data).map(function(key,index){
//           // console.log(res.data.data[key]['rate'])
//             tong+=res.data.data[key]['rate'];
//             console.log(tong)
//             average=tong/Object.keys(res.data.data).length;
//             setRating(average)
//         })
//     })

//   },[])



//   function changeRating(newRating,name){
//       console.log(newRating)
//       setRating(newRating)
      

//       let getLocal=localStorage.getItem('login')
//       getLocal=JSON.parse(getLocal)
    

//       if(getLocal==true){
//             const userData=JSON.parse(localStorage.getItem('auth'))
//             let accessToken=JSON.parse(localStorage.getItem('token'))
//             let config={
//                 headers:{
//                   'Authorization': 'Bearer '+ accessToken,
//                   'Content-type': 'application/x-www-form-urlencoded',
//                   'Accept': 'application/json'
//                 }
//             };
//             let url='http://localhost:8080/laravel/public/api/blog/rate/' +params.id

            

//             const formData =new FormData();
//                   formData.append('blog_id', params.id)
//                   formData.append('user_id', userData.id)
//                   formData.append('rate',newRating)
           
              
//             axios.post(url,formData,config)
//             .then(res=>{
//               console.log(res)
//               if(res.data.errors){
//                 setErrors(res.data.errors)

//               }else{
//                 setErrors({})

//               }
//             }) 
//             .catch(error=>{
//                 console.log(error)
//             })        
//       }
//       else{
//        setMsgRate('vui long dang nhap')
//       }
// }

const [rating,setRating]=useState(0)
let params=useParams()
const [error,setError]=useState({})
const [msgRate,setMsgRate]=useState('')


  useEffect(()=>{
    axios.get('http://localhost:8080/laravel/public/api/blog/rate/' +params.id)
    .then(res=>{
        // console.log(res.data.data)
        let tong =0;
        let averageRate=0;
        if(res.data.data){
          Object.keys(res.data.data).map(function(key,index){
            tong+=res.data.data[key]['rate']
          })
          averageRate=tong/Object.keys(res.data.data).length;
          setRating(averageRate)
        }
    })
    .catch(error => console.log(error))
  },[])
  
 
  function changeRating(newRating,name){
    setRating(newRating)
    // khi set gia tri vao state , thi luc nay chua dong Bo


    let getLocal=JSON.parse(localStorage.getItem('login'))
    if(getLocal==true){
      let userData=JSON.parse(localStorage.getItem('auth'))
      let accessToken=JSON.parse(localStorage.getItem('token'))
      let url='http://localhost:8080/laravel/public/api/blog/rate/' +params.id
     
      let config={
        headers:{
          'Authorization': 'Bearer '+ accessToken,
          'Content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
      let formData=new FormData()
          formData.append('blog_id',params.id)
          formData.append('rate',newRating)
          formData.append('user_id',userData.id)
      axios.post(url,formData,config)
      .then(res=>{
        console.log(res)
        if(res.data.errors){
            setError(res.data.errors)
        }else{
          setError({})
        }
      })
    }else{
      setMsgRate('vui long dang nhap')
    }
  }



    return(
        <>
        <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <StarRatings
                  rating={rating}
                  starRatedColor="blue"
                  changeRating={changeRating}
                  numberOfStars={6}
                  name='rating'
                  starDimension="40px"
                  starSpacing="15px"
          />
          <p> {msgRate}</p> 
          {/* <li>
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </li> */}
          <li className="color">(6 votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li><a className="color" href>Pink <span>/</span></a></li>
          <li><a className="color" href>T-Shirt <span>/</span></a></li>
          <li><a className="color" href>Girls</a></li>
        </ul>
        <Error errors={error}/>
      </div>{/*/rating-area*/}
        </>
    )
}
export default Rate;