import { useEffect, useState } from "react"
import Error from "../Error/Error"
import axios from "axios";


function CreateProduct(){
    const [input,setInput]=useState({})
    const [errors,setErrors]=useState({})
    const [brand,setBrand]=useState({})
    const [category,setCategory]=useState({})
    const [status,setStatus]=useState(1)
    const [avatar,setAvatar]=useState({})
    const [file,setFile]=useState({});
    const [msg,setSmg]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:8080/laravel/public/api/category-brand')
        .then((res)=>{
            // console.log(res)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                setBrand(res.data.brand)
                setCategory(res.data.category)
            }
        })
        .catch(error => console.log(error))
    },[])

    function fetchdatacategory(){
        if(category&& Object.keys(category).length>0){
            return category.map((value,key)=>{
                // console.log(category[key])
                return(
                    <>
                            <option value={category[key]['id']}>{category[key]['category']}</option>
                    </>
                )
            })
        }
    }
    function fetchdatabrand(){
        if(brand&& Object.keys(brand).length>0){
            return brand.map((value,key)=>{
                // console.log(brand[key])
                return(
                    <>
                            <option value={brand[key]['id']}>{brand[key]['brand']}</option>
                    </>
                )
            })
        }
    }
    const handleStatus=(e)=>{ 
        const value=e.target.value
        setStatus(value)
    }
   
    function fetchDataSale(){
        if(status==0){
            return(
                <>
                <input className="width-form" type="text" placeholder="0" name="sale" onChange={handleInput} /> <span className="font-size">%</span>
                </>
            )
        }
    }
    
    const handleInput=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setInput(state=>({...state,[name]:value}))
    }
    // console.log(input)
    const handleFileSeclected=(e)=>{
        const files=e.target.files
        setFile(files)
        // let reader= new FileReader();
        // reader.onload= (e)=>{
        //   setAvatar(e.target.result)
        //   setFile(files)
        // };
        // reader.readAsDataURL(files[0])
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let errSubmit={};
        let flag=true;
        if(input.name==undefined){
            flag=false;
            errSubmit.name="vui lòng nhập tên"
        }
        if(input.price==undefined){
            flag=false;
            errSubmit.price="vui lòng nhập price"
        }
        // if(input.category==undefined){
        //     flag=false;
        //     errSubmit.category="vui lòng chọn giỏ hàng"
        // }
        // if(input.brand==undefined){
        //     flag=false;
        //     errSubmit.brand="vui lòng chọn brand"
        // }
        // if(input.sale==undefined){
        //     flag=false;
        //     errSubmit.sale="vui lòng chọn sale"
        // }
        if(input.company==undefined){
            flag=false;
            errSubmit.company="vui lòng chọn profile"
        }
        if(input.detail==undefined){
            flag=false;
            errSubmit.detail="vui lòng chọn detail"
        }
        
        if(file.length==undefined){
            flag=false;
            errSubmit.avatar="vui lòng nhập file"
        }else if(file.length>3){
            flag=false;
            errSubmit.avatar="upload toi da 3 hinh"
        }else{
            let fileArray=["png", "jpg", "jpeg", "PNG", "JPG"];
            let takeType=file[0].type
            takeType=takeType.split('/')
            let checkType=fileArray.includes(takeType[1])
            if(!checkType){
                flag=false;
                errSubmit.avatar="vui lòng nhập đúng kiểu file"
            }else if(file.size>1024*1024){
                flag=false;
                errSubmit.avatar="kich thuoc file qua 1024";
            }
        }




        if(!flag){
            setErrors(errSubmit)
        }else{
            setErrors({})
            let accessToken=JSON.parse(localStorage['token'])
            let config={
                headers:{
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            let formData= new FormData();
                formData.append('name',input.name)
                formData.append('price',input.price)
                formData.append('category',input.category)
                formData.append('brand',input.brand)
                formData.append('company',input.company)
                formData.append('detail',input.detail)
                formData.append('status',status)
                formData.append('sale',input.sale ? input.sale:0)
            Object.keys(file).map((item,i)=>{
                console.log(file[item])
                formData.append('file[]',file[item])
            })
            axios.post('http://localhost:8080/laravel/public/api/user/add-product',formData,config)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    setErrors({})
                    // setSmg('ok')
                }
            })
        }
        
    }



    return(
        <>
            {msg}
            <Error errors={errors}/>
            <div className="col-sm-4">
              <div className="signup-form">
                <h2> Create product!</h2>
                <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                  <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                  <input type="text" placeholder="Price" name="price"onChange={handleInput} />
              
                  <select name="category" id="cars" onChange={handleInput} >
                  <option value=''>Please choose category</option>
                  {fetchdatacategory()}
                  </select>
                 
                  <select name="brand" id="cars" onChange={handleInput} >
                  <option value=''>Please choose brand</option>
                  {fetchdatabrand()}
                  </select>
                 
                  <select name="status" id="cars" value={status} onChange={handleStatus}>
                        <option value="1"  name="new" >New</option>
                        <option value="0"  name="sale" >Sale</option>
                  </select>
                        {fetchDataSale()}
                  <input type="text" placeholder="company profile" name="company"onChange={handleInput} />
                  <input type="file" id="files" placeholder="address" name="avatar" onChange={handleFileSeclected} multiple/>
                  <textarea placeholder="Detail" name="detail" onChange={handleInput}></textarea>
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
                
              </div>
            </div>
        </>
    )
}
export default CreateProduct