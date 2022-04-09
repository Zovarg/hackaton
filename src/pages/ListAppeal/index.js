import React, {useEffect, useState} from 'react'
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../component/UI/Loader/loader";
import PostList from "../../component/PostList";
import {Container} from "@material-ui/core";
import api from "../../services/api";
const Profile = () => {
  const [posts, setPosts]=useState([])
  const [fetchPosts,isPostsLoading,postError]=useFetching(async()=>{
    const response=await api.auth.getDate();
      setPosts(response.data)
  })

  useEffect(()=>{
    fetchPosts()
  },[])

    // Получаем post из дочернего компонента
    const removePost = async (post) => {
      const data={
        params: {
          request_id:post.id
        }
      }
        const del= await api.auth.deletePost(data);
        fetchPosts()
    }

  return (
      <div className="App">
        <Container>
          {postError &&
              <h1>произошла ошибка ${postError}</h1>
          }
        </Container>

        {isPostsLoading
            ? <div style={{display:'flex',justifyContent:'center', marginTop:50}}><Loader/></div>
            :<PostList remove={removePost}  posts={posts}/>
        }
      </div>
  )
}

export default Profile