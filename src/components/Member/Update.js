import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
function Update(){
    // const [input,setInput]=useState({})
   let params=useParams();
   const [msg,setMsg]=useState("");
   const [avatar,setAvatar]=useState({});

   const [file,setFile]=useState({})
   const [error,setError]=useState({})
   const [user,setUser]=useState({
       name:"",
       email:"",
       password:"",
       address:"",
       country:"",
       phone:"",
     
   })
   useEffect(()=>{
        let getUserData=JSON.parse(localStorage.getItem('auth'))
        if(getUserData){
            setUser({
                name:getUserData.name,
                email:getUserData.email,
                address:getUserData.address,
                phone:getUserData.phone,
                country:getUserData.country,
            })
        }
   },[])

   const handleInput=(e)=>{
       const name=e.target.name
       const value=e.target.value
       console.log(value)
       setUser(state=>({...state,[name]:value}))
   }
   const handleFileSeclected=(e)=>{
        const files=e.target.files
        let reader= new FileReader();
        reader.onload= (e)=>{
          setAvatar(e.target.result)
          setFile(files)
        };
        reader.readAsDataURL(files[0])
    }
   const handleSubmit =(e)=>{
        e.preventDefault();
        
        let errSubmit={};
        let flag=true;
        const regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(user.name==undefined){
            errSubmit.name="vui long nhap ten"
            flag=false;
        }
        if(user.email==undefined){
            errSubmit.email="vui long nhap email"
            flag=false;
        }else if(!regex.test(user.email)){
            errSubmit.email="địa chỉ email k hợp lệ"
            flag=false;
        }
        // if(user.password==undefined){
        //     errSubmit.password="vui lòng nhập password"
        //     flag=false;
        // }else if(user.password.length<4){
        //     errSubmit.password="pass phải có ít nhất 4 kí tự"
        //     flag=false;
        // }
        if(user.address==undefined){
            errSubmit.address="vui long nhap address"
            flag=false;
        }if(user.country==undefined){
            flag=false;
            errSubmit.country="vui lòng nhập country"
        }if(user.phone==undefined){
            flag=false;
            errSubmit.phone="vui lòng nhập phone"
        }
        // if(file.length==undefined){
        //     flag=false;
        //     errSubmit.avatar="vui lòng nhập file"
        // }
        // else{
            
        //     let fileType=["png", "jpg", "jpeg", "PNG", "JPG"];
        //     let takeType=file[0].type
        //     takeType=takeType.split('/')
        //     let checkType=fileType.includes(takeType[1])
        //     if(!checkType){
        //         flag=false;
        //         errSubmit.avatar="vui lòng nhập đúng kiểu file"
        //     }else if(file.size>1024*1024){
        //         flag=false;
        //         errSubmit.avatar="kich thuoc file qua 1024"
        //     }
        // }
        if(!flag){
            setError(errSubmit)
        }else{
            setError({})
            console.log(user)
            let accessToken=JSON.parse(localStorage.getItem('token'))
            let userData=JSON.parse(localStorage.getItem('auth'))
            
            let config={
                headers:{
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
        
            const formData=new FormData();
                    formData.append('avatar',avatar)
                    formData.append('name',user.name)
                    formData.append('email',user.email)
                    formData.append('address',user.address)
                    formData.append('phone',user.phone)
                    formData.append('country',user.country)
                    formData.append('password',user.password)

            axios.post('http://localhost:8080/laravel/public/api/user/update/'+ userData.id,formData,config)
            .then((res)=>{
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                    setMsg('ok')
                    localStorage.setItem('auth',JSON.stringify(res.data.Auth))
                }
            })
            .catch(function(error){
                console.log(error)
              })
        }
   }
  

    return(
        <>  
            <Error errors={error}/>
            <p>{msg}</p>
            <div className="col-sm-4">
              <div className="signup-form">
                <h2> User Update!</h2>
                <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                  <input type="text" placeholder="Name" name="name" onChange={handleInput} value={user.name}/>
                  <input type="email" placeholder="Email Address" name="email" onChange={handleInput} value={user.email}/>
                  <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                  <input type="text" placeholder="address" name="address" onChange={handleInput} value={user.address}/>
                  <input type="text" placeholder="country" name="country"onChange={handleInput} value={user.country} />
                  <input type="text" placeholder="phone" name="phone"onChange={handleInput} value={user.phone}/>
                  <input type="file" placeholder="address" name="avatar"onChange={handleFileSeclected} />
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
              </div>
            </div>
        </>
    )
}
export default Update;