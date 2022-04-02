import { useEffect, useState } from "react"
import Error from "../Error/Error"
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct(){
    const [input,setInput]=useState({})
    const [errors,setErrors]=useState({})
    const [brand,setBrand]=useState({})
    const [category,setCategory]=useState({})
    const [status,setStatus]=useState(1)
    const [avatar,setAvatar]=useState([])
    const [file,setFile]=useState({});
    const [msg,setSmg]=useState('')
    
   
    let params=useParams()
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



        let accessToken=JSON.parse(localStorage['token'])

        let config={
            headers:{
                'Authorization': 'Bearer '+ accessToken,
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        axios.get('http://localhost:8080/laravel/public/api/user/product/'+params.id,config)
        .then((res)=>{
            console.log(res)
            if(res.data.data){
                setInput(res.data.data)
            }
        })

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
    function fetchDataImage(){
        let getLocal=JSON.parse(localStorage.getItem('auth'))
        if(input && Object.keys(input).length>0){
                //  console.log(input)
           
                // console.log(typeof(input['image']))
                let image=input['image']
                return  Object.keys(image).map(function(key,value){
                    return(
                        <>
                            <div>
                            <img className="size" src={'http://localhost:8080/laravel/public/upload/user/product/'+getLocal.id +"/"+image[key]} />
                            <input type='checkbox' name="check_img" onChange={handleAvatarSelected} value={image[key]} />
                            </div>
                        </>
                    )
                })
              
            
        }
    }
    // push
    
    // - click vao checkbox thi lay value dua vao 1 mang, va cuoi cung gui mangXOA qua api
    // - hinh upload la bat chon:
    //     - hinh con lai: hinh cu(1,2,3) - hinh xoa (2,3) => 1
    //     - hinh moi 
    //     => neu 2 cai nay > 3 thi bao loi

    
    const handleAvatarSelected=(e)=>{
        const value=e.target.value
        const checkbox=e.target.checked
        // console.log(checkbox)
        if(checkbox==true){ 
            setAvatar(state=>([...state,value]))

        }else{
            setAvatar(state=>([...state,value].filter(item => item !== value)))  
        }
        // neu false: xoa ten do ra khoi mang 
    }
    // console.log(avatar)
    // console.log(avatar.length)
    
    
   



    const handleInput=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setInput(state=>({...state,[name]:value}))
        
    }
    // console.log(input.image)

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
        if(input.company_profile==undefined){
            flag=false;
            errSubmit.company_profile="vui lòng chọn profile"
        }
        if(input.detail==undefined){
            flag=false;
            errSubmit.detail="vui lòng chọn detail"
        }
        
        if(file.length==undefined){
            flag=false;
            errSubmit.avatar="vui lòng nhập file"
            let hinhcu= input.image.length
            let hinhmoi=avatar.length
            let hinhconlai=hinhcu-hinhmoi
            setAvatar(hinhconlai)
        }else if(file.length + avatar.length>3){
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
        // console.log(input.check_img.value)
        // if(avatar.check_img==undefined){
        //     flag=false;
        //     errSubmit.check_img="vui lòng chọn hình ảnh"
        // }
        // else{
        //     flag=false;
            
        // }
        




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
                formData.append('category',input.id_category)
                formData.append('brand',input.id_brand)
                formData.append('company',input.company_profile)
                formData.append('detail',input.detail)
                formData.append('status',status)
                formData.append('sale',input.sale)

            Object.keys(file).map((item,i)=>{
                console.log(file[item])
                formData.append('file[]',file[item])
            })
            Object.keys(avatar).map((item,i)=>{
                console.log(avatar[item])
                formData.append('avatarCheckBox[]',avatar[item])
            })
            

            axios.post('http://localhost:8080/laravel/public/api/user/edit-product/' +params.id,formData,config)
            .then((res)=>{
                // console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    setErrors({})
                    setSmg('ok')
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
                <h2> Edit product!</h2>
                <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                  <input type="text" placeholder="Name" name="name" onChange={handleInput} value={input.name} />
                  <input type="text" placeholder="Price" name="price"onChange={handleInput} value={input.price} />
              
                  <select name="category" id="cars" onChange={handleInput} value={input.id_category}>
                  <option value=''>Please choose category</option>
                  {fetchdatacategory()}
                  </select>
                 
                  <select name="brand" id="cars" onChange={handleInput} value={input.id_brand} >
                  <option value=''>Please choose brand</option>
                  {fetchdatabrand()}
                  </select>
                  <select name="status" id="cars" value={status} onChange={handleStatus}>
                        <option value="1"  name="new" >New</option>
                        <option value="0"  name="sale" >Sale</option>
                  </select>
                        {fetchDataSale()}
                  <input type="text" placeholder="company profile" name="company profile"onChange={handleInput} value={input.company_profile} />
                  <input type="file" id="files" placeholder="address" name="avatar" onChange={handleFileSeclected} multiple  />
                    <div className="img_edit">
                        {fetchDataImage()}
                    </div>
                    
                 
                  <textarea placeholder="Detail" name="detail" onChange={handleInput} value={input.detail} ></textarea>
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
                
              </div>
            </div>
        </>
    )
}
export default EditProduct