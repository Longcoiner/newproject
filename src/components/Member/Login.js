import { useState } from "react";
import Error from "../Error/Error";
import {useNavigate} from 'react-router-dom'
import Register from "./Register";
import axios from "axios";


function Login(){
    const [confirmInput,setConfirmInput]=useState({});
    const[error,setErrors]=useState({});
    const navigate=useNavigate();
    

    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setConfirmInput(state=>({...state,[name]:value}))
      }

    const handleSubmit =(e)=>{        
            e.preventDefault();
            let flag=true;
            let errSubmit={}
            let regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(confirmInput.email==undefined){
                flag=false;
                errSubmit.email="vui long nhap email"
            }else if(!regex.test(confirmInput.email)){
                flag=false;
                errSubmit.email="khong dung dinh dang email"
            }
            if(confirmInput.password==undefined){
              flag=false;
              errSubmit.password="vui long nhap password"
            }else if(confirmInput.password.length<4){
              flag=false;
              errSubmit.password="pass toi da phai 4 ky tu"
            }
            if(confirmInput.checkbox==undefined){
                flag=false;
                errSubmit.checkbox="ban phai chap nhan dieu kien"
            }
            if(!flag){
                setErrors(errSubmit);
            }
            else{
                setErrors({});
                const data={
                  email:confirmInput.email,
                  password: confirmInput.password,
                  level:0,
                }
                console.log(data)
                axios.post("http://localhost:8080/laravel/public/api/login",data)
                .then((res)=>{
                    console.log(res)
                    if(res.data.errors){
                      setErrors(res.data.errors)
                    }else{
                      localStorage.setItem('login',JSON.stringify(true))
                      localStorage.setItem('auth',JSON.stringify(res.data.Auth))
                      localStorage.setItem('token',JSON.stringify(res.data.success.token))
                      navigate("/");
                    }
                    
                })
            }
        
    }


    



    return(
        <>
      
        <section id="form" >
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                <h2>Login to your account</h2>
                <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                  {/* <input type="text" placeholder="Name" name="name"  onChange={handleInput}/> */}
                  <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
                  <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                  <span>
                    <input type="checkbox" className="checkbox" name="checkbox" onChange={handleInput} /> 
                    Keep me signed in
                  </span>
                  <button type="submit" className="btn btn-default">
                    Login
                  </button>
                    <Error errors={error}/>
                </form>
                    
              </div>
            </div>
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <Register/>
          </div>
        </div>
      </section>
        </>
    )
}
export default Login;