import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../Error/Error";



function Register(){

  const [input,setInput]=useState({})
  const [error,setError]=useState({})
  const [avatar,setAvatar]=useState({})
  const [file,setFile]=useState({})

  const handleInput=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setInput(state=>({...state,[name]:value}))
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    let errSubmit={}
    let flag=true;
    let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.name==undefined){
      flag=false;
      errSubmit.name='xin vui lòng nhập tên'
    }
    if(input.email==undefined){
      flag=false;
      errSubmit.email="xin vui lòng nhập email"
    }else if(!regex.test(input.email)){
      flag=false;
      errSubmit.email="vui lòng nhập đúng dạng email"
    }
    if(input.password==undefined){
      flag=false;
      errSubmit.password="xin vui long nhap password"
    }else if(input.password.length<4){
      flag=false;
      errSubmit.password="phai co it nhat 4 ki tu"
    }
    if(input.address==undefined){
      flag=false;
      errSubmit.address="xin vui long nhap địa chỉ"
    }
    if(input.country==undefined){
      flag=false;
      errSubmit.country="xin vui long nhap country"
    }
    if(input.phone==undefined){
      flag=false;
      errSubmit.phone="xin vui long nhap phone"
    }
    if(file.length==undefined){
      flag=false;
      errSubmit.avatar="xin vui long nhap file"
    }else{
      let type=["png", "jpg", "jpeg", "PNG", "JPG"];
      let takeType=file[0].type
      let take=takeType.split('/')
      let newType=type.includes(take[1])
        if(!newType){
          flag=false
          errSubmit.avatar="vui lòng nhập đúng kiểu file"
        }
        else if(file.size>1024*1024) {
            flag=false;
            errSubmit.avatar="size upload phai co kich thuoc 1024x1024"
        }
    }
    if(!flag){
      setError(errSubmit)
    }else{
      setError({})
      input['level']=0
      input['avatar']=avatar
      axios.post('http://localhost:8080/laravel/public/api/register',input)
      .then(res=>{
        setError(res.data.errors)
        console.log(res)
      })
      .catch(error=>console.log(error))
    }

  }
  const handleFileSeclected=(e)=>{
      const files=e.target.files
      console.log(files)
      let reader= new FileReader()
      reader.onload=(e)=>{
        setAvatar(e.target.result)
        setFile(files)
      }
      reader.readAsDataURL(files[0])
  }

   
    //   const [input,setInput]=useState({});
    //   const [error,setError]=useState({});
    //   const [file,setFile]=useState({});
    //   const [avatar,setAvatar]=useState({});
    //   const [msg,setMsg]=useState("");


    //   const handleInput=(e)=>{
    //     const name=e.target.name;
    //     const value=e.target.value;
    //     setInput(state=>({...state,[name]:value}))
    //   }

      

    //   const handleFileSeclected=(e)=>{
    //     const files=e.target.files

    //     let reader= new FileReader();
    //     reader.onload= (e)=>{
    //       setAvatar(e.target.result)
    //       setFile(files)
    //     };
    //     reader.readAsDataURL(files[0])
    //   }
    // //  console.log(avatar1)
    // //  console.log(file)
    //  console.log(input) 
    



    //   const handleSubmit =(e)=>{
    //     console.log(input.name)

    //     e.preventDefault();
    //     let errSubmit={};
    //     let flag=true;
    //     const regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //     if(input.email==undefined){
    //         flag=false;
    //         errSubmit.email="vui lòng nhập email"
    //     }else if(!regex.test(input.email)){
    //       flag=false;
    //       errSubmit.email="địa chỉ email không hợp lệ"
    //     }
    //     if(input.name==undefined){
    //       flag=false;
    //       errSubmit.name="vui lòng nhập tên"
    //     }
    //     if(input.password==undefined){
    //       flag=false;
    //       errSubmit.password="vui lòng nhập password"
    //     }else if(input.password.length<4){
    //       flag=false;
    //       errSubmit.password="pass phai co toi da 4 ky tu"
    //     }
    //     if(input.address==undefined){
    //       flag=false;
    //       errSubmit.address="vui lòng address"
    //     }if(input.country==undefined){
    //       flag=false;
    //       errSubmit.country="vui lòng nhập country"
    //     }if(input.phone==undefined){
    //       flag=false;
    //       errSubmit.phone="vui lòng nhập phone"
    //     }

    //     if(file.length==undefined){
    //       flag=false;
    //       errSubmit.avatar="vui lòng nhập file"
    //     }else{
    //       let fileArray=["png", "jpg", "jpeg", "PNG", "JPG"];
    //       let takeType=file[0].type
    //       takeType=takeType.split('/')
    //       let checkType=fileArray.includes(takeType[1])
    //       if(!checkType){
    //           flag=false;
    //           errSubmit.avatar="vui lòng nhập đúng kiểu file"
    //       }else if(file.size>1024*1024){
    //           flag=false;
    //           errSubmit.avatar="kich thuoc file qua 1024";
    //       }
    //     }
        



    //     if(!flag){
    //       setError(errSubmit);
    //     }else{
    //       setError({})

    //       input["level"]=0
    //       input["avatar"] = avatar
    //       axios.post("http://localhost:8080/laravel/public/api/register",input)
    //       .then((res)=>{

    //        if(res.data.errors){
    //         setError(res.data.errors);
    //        }else{
    //         setMsg("ok")
    //         console.log(res)

    //        }
    //       })
    //     }
        
    //   }


    return(
        <>
            {/* <p>{msg}</p> */}
            <Error errors={error}/>
            <div className="col-sm-4">
              <div className="signup-form">
                <h2>New User Signup!</h2>
                <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
                  <input type="text" placeholder="Name" name="name" onChange={handleInput} value={input.name}/>
                  <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
                  <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                  <input type="text" placeholder="address" name="address" onChange={handleInput}/>
                  <input type="text" placeholder="country" name="country"onChange={handleInput} />
                  <input type="text" placeholder="phone" name="phone"onChange={handleInput} />
                  <input type="file" placeholder="address" name="avatar"onChange={handleFileSeclected} />
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
              </div>
            </div>
        
      
        </>
    )
}
export default Register;