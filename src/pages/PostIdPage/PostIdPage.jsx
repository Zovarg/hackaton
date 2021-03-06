import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useFetching} from "../../hooks/useFetching";
import api from "../../services/api";
import Loader from "../../component/UI/Loader/loader";
import {Button, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import validationSchema from "../PostIdPage/validation";
import PostIdPageNum from "./PostIdPageNum";

const useStyles = makeStyles((theme) => ({
    root: {
        margin:'20px auto',
        padding: theme.spacing(3),
        border:'2px solid black',
    },
    but: {
        background: '#639593',
        margin:'5px 10px 5px 0'
    },
    buttonSpacing: {
        marginLeft: theme.spacing(1),
    },
    bord: {
        border:'2px solid black',
    },
}));

const PostIdPage = () => {
   const params = useParams()
    const [value,setValue] = useState('');
    const [post, setPost] = useState([]);
    const [state,setState] = useState('');
    const [fetchPosts,isPostsLoading,postError] = useFetching(async (id) => {
        const response = await api.auth.getDate()
        const templ = await api.auth.getTemplate()

        {response.data.map((poster, index)=>{
           if(poster.id==id){
               setPost(poster);
               setState(poster.classification.type);
               templ.data.map((tmpl, index)=>{
                   if(tmpl.classification.type==poster.classification.type){
                       let time=poster.created_at.slice(0, 19)
                       const array=time.split('T')
                       time=array.join(' ')
                       const stroka=`${value}`+` ${time}`
                       const changeString= tmpl.text.replace( /\${fullname}/,poster.user_full_name).replace( /\${date}/,stroka).replace( /\${phone}/,poster.user_phone).replace( /\${institution}/,poster.medical_institution)
                       setValue(changeString)
                   }
               })
               reset({
                   classification: poster.classification.type,
               });
           }}
        )}

    })


    useEffect(() => {
        fetchPosts(params.id)
    }, [])

    const classes = useStyles();
    const [isLoadings, setIsLoadings] = useState(false);
    const router= useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            setIsLoadings(true);
            const destruction={...data}
            destruction.text=value
            const { data: userData } = await api.auth.createReview({'text':destruction.text,'request_id':post.id,'classification':post.classification.type});
            const redir=()=>router(`/posts`);
            redir();
        } catch (e) {
            if (e.response.status)
                {
                    console.log(e.response.status)
                }

        } finally {
            setIsLoadings(false);
        }
    };

    const onSubmitFun1 =  (e) => {
        e.preventDefault()
        const stroka=`${value}`+` ${post.user_full_name}`
        setValue(stroka)
    };
    const onSubmitFun2 =  (e) => {
        e.preventDefault()
        const stroka=`${value}`+` ${post.user_phone}`
        setValue(stroka)
    };
    const onSubmitFun3 =  (e) => {
        e.preventDefault()
        let time=post.created_at.slice(0, 19)
        const array=time.split('T')
        time=array.join(' ')
        const stroka=`${value}`+` ${time}`
        setValue(stroka)

    };
    return (
        <Container maxWidth="xs" className={classes.root}>
            {isPostsLoading
                ? <div style={{display:'flex',justifyContent:'center', marginTop:50}}><Loader/></div>
                : <PostIdPageNum post={post} state={state}/>
            }

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">?????????? ???? ????????????</Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoadings}
                        className={classes.but}
                        onClick={onSubmitFun1}
                    >
                        ??????
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoadings}
                        className={classes.but}
                        onClick={onSubmitFun2}
                    >
                        ??????????????
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoadings}
                        className={classes.but}
                        onClick={onSubmitFun3}
                    >
                        ???????? ??????????????????
                    </Button>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth sx={{ m: 1 }}
                                    error={Boolean(errors.text?.message)}
                                    id="filled-multiline-static"
                                    label="??????????"
                                    multiline
                                    variant="filled"
                                    helperText={errors.text?.message}
                                    value={value}
                                    onChange={event=>setValue(event.target.value)}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="classification"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={Boolean(errors.classification?.message)}
                                    fullWidth={true}
                                    label="??????????????????????????"
                                    variant="filled"
                                    helperText={errors.classification?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoadings}
                            className={classes.but}
                        >
                            ??????????????????
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );
};

export default PostIdPage;
