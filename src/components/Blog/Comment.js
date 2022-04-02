
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom"
import Error from "../Error/Error";






function Comment(props){
  let params=useParams();
  


  const[error,setErrors]=useState({});
  const[msg,setMsg]=useState("");
  const[comment, setComment]=useState('')
  
  
      const handleClick =(e)=>{
        setComment(e.target.value)
      }
      
      const handleSubmitComment=(e)=>{
           e.preventDefault();
            let {replay}=props
            console.log(replay)
            const userData =JSON.parse(localStorage["auth"])
            const take= localStorage.getItem('login')
            if(take){
              let take1=JSON.parse(take)
              if(take1==true){
                if(comment){
                  let accessToken=JSON.parse(localStorage['token'])
                  
                  let config={
                        headers:{
                            'Authorization': 'Bearer '+ accessToken,
                            'Content-type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        }
                  };
                  let url='http://localhost:8080/laravel/public/api/blog/comment/'+ params.id
                  
                  const formData=new FormData();
                        formData.append('id_blog', params.id)
                        formData.append('id_user', userData.id)
                        formData.append('id_comment',replay ? replay: 0)
                       
                        formData.append('comment',comment)
                        formData.append('image_user',userData.avatar)
                        formData.append('name_user',userData.name)
                       
                      axios.post(url,formData,config)
                      .then(res=>{
                        console.log(res)
                        if(res.data.errors){
                          setErrors(res.data.errors)
                          setMsg('')
                        }else{
                          setMsg('ok')
                          props.getComment(res.data.data)
                        }
                      })  
                }else{
                  setMsg('vui long nhap cmt')
                }
              }
            }
            else{
              setMsg('vui long login')
            }
            
      }

        

    return(
        <>
         <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <p>{msg}</p>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea name="message" rows={11} defaultValue={""}  onChange={handleClick} /> 
              <a className="btn btn-primary" href onClick={handleSubmitComment} >post comment</a>
            </div>
           

          </div>
        </div>
         </div>
        </>
    )
}
export default Comment;