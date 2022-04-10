import React from 'react';
import Loader from "../../component/UI/Loader/loader";

const PostIdPageNum = (props) => {
    return (
        <div>
            <h2>Номер обращения: {props.post.id}</h2>
                 <div>
                     <strong> Классификация: {props.state}</strong>
                    <div><i>Медицинское учреждение: {props.post.medical_institution} </i></div>
                    <div >Содержание:</div>
                    <div >{props.post.text} </div>
                </div>
        </div>
    );
};

export default PostIdPageNum;