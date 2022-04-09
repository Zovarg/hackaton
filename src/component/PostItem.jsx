import React from 'react'
import MyButton from './UI/button/MyButton'
import {useNavigate} from 'react-router-dom'
import cl from "./Profile.module.css"
//Создание отдельных элементов(команд)
const PostItem = (props) => {
    const router= useNavigate()
    return (

            <div className={cl.post__content}>
                <strong> Классификация: {props.post.classification.type}</strong>
                <div>
                    <i>Медицинское учреждение: {props.post.medical_institution}</i>
                </div>
                <div>
                    {props.post.text}
                </div>
                <MyButton onClick={()=>router(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
            </div>
    )
}

export default PostItem