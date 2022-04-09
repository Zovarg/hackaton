import React from 'react'
import PostItem from "./PostItem";
import {Container} from "@material-ui/core";
//Создаём общего список команд с помощью TeamItem
const PostList = ({posts}) => {
    if(!posts.length){
        return (
            <h1 style={{textAlign:'center'}}>
                Отзывы не найдены!
            </h1>
        )
    }

    return (
        <div>
            <Container className="box">
                {posts.map((post, index)=>
                    <PostItem key={index+1} post={post}/>
                )}
            </Container>
        </div>
    )
}

export default PostList