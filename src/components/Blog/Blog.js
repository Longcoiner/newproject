import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



function Blog() {
    
    const [getItem, setItem] = useState('');
    useEffect(() => {
        axios.get("http://localhost:8080/laravel/public/api/blog")
            .then(res => {
                setItem(res.data.blog.data)
            })
            .catch(error => console.log(error))
    }, [])

    function fetchdata() {
        if (getItem && Object.keys(getItem).length > 0) {
            return getItem.map((value, key) => {
                let dayTime= new Date(value.created_at)
                let Time=dayTime.getHours()+ ':' +dayTime.getMinutes()+ ':' +dayTime.getSeconds();
                let Day=dayTime.getFullYear()+ ':'+ (dayTime.getMonth()+1) + ':'+dayTime.getDate();
                return (
                    <>  
                        <div  className="single-blog-post" key={key} index={key}>
                            <h3>{value.title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user" /> Mac Doe</li>
                                    <li><i className="fa fa-clock-o" />{Time}</li>
                                    <li><i className="fa fa-calendar" />{Day}</li>
                                </ul>
                                <span>
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half-o" />
                                </span>
                            </div>
                            <a href>
                                <img src={'http://localhost:8080/laravel/public/upload/Blog/image/'+ value.image} alt="" />
                                
                            </a>
                            <p>{value.content} </p>.
                            <Link to={'/blog/detail/'+ value.id}  className="btn btn-primary">Read More</Link>
                        </div>
                    </>

                )
            })
        }
    }




    return (
        <>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {fetchdata()}
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a href className="active">1</a></li>
                            <li><a href>2</a></li>
                            <li><a href>3</a></li>
                            <li><a href><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Blog;