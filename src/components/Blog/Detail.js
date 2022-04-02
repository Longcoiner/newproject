import axios from "axios";
import React , { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import Comment from './Comment'
import ListComment from './ListComment'
import Rate from './Rate'



function Detail(props){
    let params=useParams();
    const[data,setData]=useState('');
    const[listComent,SetListComent]=useState({});
    const[replay, idReplay]=useState()
    
    function getComment(data){
      // console.log(listComent)
        console.log(data)
        let newComment=listComent.concat(data)
        SetListComent(newComment)
    }
    
    function getReplay(reply){
        console.log(reply)
        idReplay(reply)   
    }



    
    useEffect (()=>{
        axios.get("http://localhost:8080/laravel/public/api/blog/detail/" + params.id)
        .then(res=>{
            // console.log(res)
            setData(res.data.data)
            // console.log(res.data.data.comment)
            SetListComent(res.data.data.comment)
        
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    

    function fetchdata (){
      if(data&& Object.keys(data).length>0){
        let dayTime= new Date(data.created_at)
        let Time=dayTime.getHours()+ ':' +dayTime.getMinutes()+ ':' +dayTime.getSeconds();
        let Day=dayTime.getFullYear()+ ':'+ (dayTime.getMonth()+1) + ':'+dayTime.getDate();
            return(
              <>
              <div className="col-sm-9">
                <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                          <h3>{data.title}</h3>
                          <div className="post-meta">
                            <ul>
                              <li><i className="fa fa-user" /> Mac Doe</li>
                              <li><i className="fa fa-clock-o" /> {Time}</li>
                              <li><i className="fa fa-calendar" /> {Day}</li>
                            </ul>
                          </div>
                          <a href>
                            <img src={'http://localhost:8080/laravel/public/upload/Blog/image/'+ data.image} alt="" />
                          </a>
                          <p>{data.content}</p> <br />
                          <p>{data.description} </p> <br />
                          <p>{data.description} </p> <br/>
                          <p>{data.description}</p>
                          <div className="pager-area">
                            <ul className="pager pull-right">
                              <li><a href="#">Pre</a></li>
                              <li><a href="#">Next</a></li>
                            </ul>
                          </div>
                      </div>
                  </div>{/*/blog-post-area*/}
                  <Rate/>
                
                  <ListComment listComent={listComent} getReplay={getReplay}/>
                  <Comment getComment= {getComment} replay={replay} />
                  
                  {/* <ListComment1 listComent={listComent}/>
                  <Comment1 getComment={getComment}/> */}
                </div>
              </>
            )
      }
    }


    return(
        <>
        {fetchdata()}
        </>
    )
}
export default Detail;