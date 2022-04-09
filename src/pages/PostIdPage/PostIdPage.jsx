import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useFetching} from "../../hooks/useFetching";
import api from "../../services/api";
import Loader from "../../component/UI/Loader/loader";
import useAuth from "../../hooks/useAuth";
import {Button, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import validationSchema from "../PostIdPage/validation";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    buttonSpacing: {
        marginLeft: theme.spacing(1),
    },
}));

const PostIdPage = () => {
   const params = useParams()
    const auth = useAuth();
    const [post, setPost] = useState({});

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await api.auth.getDate()
        console.log(response)
        {response.data.map((poster, index)=>{
           if(poster.id==id){
               setPost(poster);
           }}
        )}

    })


    useEffect(() => {
        fetchPostById(params.id)

    }, [])
    const classes = useStyles();
    const [isLoadings, setIsLoadings] = useState(false);
    const router= useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            setIsLoadings(true);
            const destruction={...data}
            if(destruction.classification==""){
            const { data: userData } = await api.auth.createReview({'text':destruction.text,'request_id':post.id,'classification':post.classification.type});
              }
            else {const { data: userData } = await api.auth.createReview({...data,'request_id':post.id});
                }
            const redir=()=>router(`/posts`);
            redir();


        } catch (e) {
            if (e.response.status === 422) {
                Object.keys(e.response.data.errors).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: e.response.data.errors[key],
                    });
                });
            }
        } finally {
            setIsLoadings(false);
        }
    };
    return (
        <Container maxWidth="xs" className={classes.root}>
            <h2>Номер обращения: {post.id}</h2>
            {isLoading
                ? <Loader/>
                :  <div>
                    {/*<div>Классификация: {post.classification.type}</div>*/}
                        <div><i>Медицинское учреждение: {post.medical_institution} </i></div>
                        <div>Содержание:</div>
                        <div>{post.text} </div>
                    </div>
            }
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Ответ на письмо</Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    label="Ответ"
                                    multiline

                                    variant="filled"
                                    helperText={errors.text?.message}
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
                                    error={Boolean(errors.classific?.message)}
                                    fullWidth={true}
                                    label="Классификация"
                                    variant="filled"
                                    helperText={errors.classific?.message}
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
                        >
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );
};

export default PostIdPage;
