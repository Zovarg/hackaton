import {Grid, makeStyles, Container, Typography, TextField, Button} from "@material-ui/core";
import {useState} from "react";
import useAuth from "../../hooks/useAuth";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import validationSchema from "../Home/validation";
import api from "../../services/api";
import {Link} from "react-router-dom";
import MyModel from "../MyModal/MyModel";
import cl from "./Home.module.css"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const[modal,setModal]=useState(false);
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
      setIsLoading(true);
      const { data: loginData } = await api.auth.form(data);
      setModal(true);
      console.log(loginData)
      reset({
        user_full_name: "",
        user_phone:"",
        email:"",
        medical_institution:"",
        text:"",

      });

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
      setIsLoading(false);
    }
  };

  return (
      <Container maxWidth="xs" className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Форма обращения</Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                  name="user_full_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                      <TextField
                          {...field}
                          error={Boolean(errors.user_full_name?.message)}
                          fullWidth={true}
                          label="ФИО"
                          variant="filled"
                          helperText={errors.user_full_name?.message}
                      />
                  )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                  name="user_phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                      <TextField
                          {...field}
                          error={Boolean(errors.telephone?.message)}
                          type="tel"
                          fullWidth={true}
                          label="Телефон"
                          variant="filled"
                          helperText={errors.telephone?.message}
                      />
                  )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                      <TextField
                          {...field}
                          error={Boolean(errors.email?.message)}
                          fullWidth={true}
                          type="email"
                          label="Email"
                          variant="filled"
                          helperText={errors.email?.message}
                      />
                  )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                  name="medical_institution"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                      <TextField
                          {...field}
                          error={Boolean(errors.medical_institution?.message)}
                          fullWidth={true}
                          label="Населённый пункт и мед. учреждение"
                          variant="filled"
                          helperText={errors.medical_institution?.message}
                      />
                  )}
              />
            </Grid>

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
                          label="Обращение"
                          multiline

                          variant="filled"
                          helperText={errors.text?.message}
                      />
                  )}
              />
            </Grid>
            <Grid item xs={12}>
            <div>
              <input type="checkbox" id="horns" name="horns" required/>
                <label htmlFor="horns">Согласие на обработку </label><Link to="/agree">данных</Link>
            </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
              >
                Оправить форму
              </Button>
            </Grid>
          </Grid>
        </form>
        <MyModel visible={modal} setVisible={setModal}>
          <div>Ваше обращение было принято в обработку. Ожидайте ответа в течение 30 дней!</div>
        </MyModel>
        <div className={cl.contacts}>
          <div className={cl.contacts_item}>Наши контакты:</div>
          <div className={cl.contacts_item}>Email: showMustGoOn@mail.ru</div>
          <div className={cl.contacts_item}>Телефон: 89181112288</div>
        </div>

      </Container>
  );
}

export default Home;
