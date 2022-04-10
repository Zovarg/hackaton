import React from 'react'
import MyButton from './UI/button/MyButton'
import {useNavigate} from 'react-router-dom'
import cl from "./Profile.module.css"
import {
    TextField,
    Grid,
    makeStyles,
    Container,
    Button,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    but: {
        background: '#e8f3f2',
        margin:'10px',
        '&:hover': {
            backgroundColor: 'white',

        }
    },

}));

const PostItem = (props) => {
    const classes = useStyles();
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
                <Button color="inherit" onClick={()=>router(`/posts/${props.post.id}`)}  className={classes.but}>
                    Открыть
                </Button>
                <Button color="inherit" onClick={() => props.remove(props.post)}  className={classes.but}>
                    Удалить
                </Button>

            </div>
    )
}

export default PostItem