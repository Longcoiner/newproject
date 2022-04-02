import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Error from "../Error/Error"
import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';


function ProductDetail(){
    let params =useParams()
    const [errors,setErrors]=useState({})
    const [productDetail,setProductDetail]=useState({})
    const [showImage,setShowImage]=useState(
        
    )
   
   
    useEffect(()=>{
       
        axios.get('http://localhost:8080/laravel/public/api/product/detail/'+params.id)
        .then((res)=>{
            // console.log(res.data.data.image)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                setProductDetail(res.data.data)
                let img=JSON.parse(res.data.data.image)
                setShowImage(img[0])
            }
        })
       
    },[])
    // console.log(productDetail)
    function fetchDataBigImage(e){
        
        if(productDetail&&Object.keys(productDetail).length>0){
                let img= JSON.parse(productDetail['image'])
                // console.log(img[0])
              
                return(
                    <>
            <div className="col-sm-5">
                <div className="view-product">
                    <img src={'http://localhost:8080/laravel/public/upload/user/product/'+productDetail['id_user']+'/'+showImage} alt="" />
                    <a href="" rel="prettyPhoto" onClick={openPopupBox}><h3>ZOOM</h3></a>
                    <PopupboxContainer />
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    {fetchDataSmallImage()}
                                </div>
                            </div>
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                            </a>
                        </div>
            </div>
                    </>
                )
            
        }
    }

    function fetchDataInformation(){
        if(productDetail&&Object.keys(productDetail).length>0){
            // console.log(productDetail)
            return(
                <>
                <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{productDetail['name']}</h2>
                    <p>Web ID: 1089772</p>
                    <img src="images/product-details/rating.png" alt="" />
                    <span>
                    <span>US ${productDetail['price']}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={3} />
                    <button type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                    </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> New</p>
                    <p><b>Brand:</b> E-SHOPPER</p>
                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                </div>{/*/product-information*/}
            </div>
                </>
            )
        }
    }
    function openPopupBox(e){
        e.preventDefault();
        const content = <img src={'http://localhost:8080/laravel/public/upload/user/product/'+productDetail['id_user']+'/'+showImage} />
        PopupboxManager.open({
        content,
        config: {
          titleBar: {
            enable: true,
            text: 'Meow!'
          },
          fadeIn: true,
          fadeInSpeed: 500
        }
      })
    }
    const handleShowImage=(e)=>{
        const name=e.target.name
        console.log(name)
        setShowImage(name)
    }
    
    function fetchDataSmallImage(){
        if(productDetail&& Object.keys(productDetail).length>0){
             let image_product=JSON.parse(productDetail['image'])
             return Object.keys(image_product).map((key,value)=>{
                return (
                    <>
                                <a href><img name={image_product[key]} className="size1" src={'http://localhost:8080/laravel/public/upload/user/product/'+productDetail['id_user']+'/'+image_product[key]} alt="" onClick={handleShowImage} /></a>
                    </>
                )
             })
        }
    }

    return(
        <>
            <Error errors={errors}/>
        <div className="product-details">{/*product-details*/}
            {fetchDataBigImage()}
        
            {fetchDataInformation()}
      </div>{/*/product-details*/}
        
        </>
    )
}
export default ProductDetail