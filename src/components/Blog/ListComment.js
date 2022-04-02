import axios from "axios";
import React , { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function ListComment(props){
 
  function handleReplay(e){
    console.log(e.target.id)
    props.getReplay(e.target.id)
  }
  
 
 
  function renderComment(){
    let {listComent}=props
    // console.log(listComent)
    if(listComent && Object.keys(listComent).length>0){
      // console.log(listComent)
        let dayTime= new Date(listComent[0].created_at)
        let Time=dayTime.getHours()+ ':' +dayTime.getMinutes()+ ':' +dayTime.getSeconds();
        let Day=dayTime.getFullYear()+ ':'+ (dayTime.getMonth()+1) + ':'+dayTime.getDate();
        return Object.keys(listComent).map((key,index)=>{
            if(listComent[key]['id_comment']==0){
                return(
                  <>
                    <li className="media">
                      <a className="pull-left" href="#">
                        <img className="media-object size "  src={'http://localhost:8080/laravel/public/upload/user/avatar/'+ listComent[key]['image_user']} alt="" />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user" />{listComent[key].name_user}</li>
                          <li><i className="fa fa-clock-o" /> {Time} pm</li>
                          <li><i className="fa fa-calendar" /> {Day}</li>
                        </ul>
                        <p>{ listComent[key]['comment']}</p>
                        <a id={listComent[key]['id']} className="btn btn-primary"  onClick={handleReplay}>Replay</a>
                      </div>
                    </li>
                  
                    {
                      Object.keys(listComent).map((key1,index)=>{
                      if(listComent[key1]['id_comment']== listComent[key]['id']){
                        return(
                          <li className="media second-media">
                            <a className="pull-left" href="#">
                              <img className="media-object size "  src={'http://localhost:8080/laravel/public/upload/user/avatar/'+ listComent[key1]['image_user']} alt="" />
                            </a>
                            <div className="media-body">
                              <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user" />{listComent[key1].name_user}</li>
                                <li><i className="fa fa-clock-o" /> {Time} pm</li>
                                <li><i className="fa fa-calendar" /> {Day}</li>
                              </ul>
                              <p>{ listComent[key1]['comment']}</p>
                            
                            </div>
                          </li>
                          )
                        }
                      })
                    }
                  </>
                
                )
                
              
                
              
            }
           
        })
    }
}




// map
// id_cmt==0
//     -cha
//         map
//         id_cmt_CON == id_CHA
//             + con
//             + con
//             + con
//     -cha
//     -cha
  
  
  










    return(
        <>
        <div className="response-area">
        <h2>3 RESPONSES</h2>
        

        <ul className="media-list">
          {renderComment()}
         
        </ul>					
      </div>{/*/Response-area*/}
        </>
    )
}
export default ListComment;