import React, {useEffect, useState} from 'react'
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../component/UI/Loader/loader";
import PostList from "../../component/PostList";
import {Container} from "@material-ui/core";
import api from "../../services/api";
const Teams = () => {
  const [posts, setPosts]=useState([])
  const [fetchPosts,isPostsLoading,postError]=useFetching(async()=>{
    const response=await api.auth.getDate();
    console.log(response.data)
      setPosts(response.data)

  })

  useEffect(()=>{
    fetchPosts()
  },[])

  return (
      <div className="App">
        <Container>
          {postError &&
              <h1>произошла ошибка ${postError}</h1>
          }
        </Container>

        {isPostsLoading
            ? <div style={{display:'flex',justifyContent:'center', marginTop:50}}><Loader/></div>
            :<PostList posts={posts}/>

        }

      </div>
  )
}

export default Teams