import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Profile from "../../pages/ListAppeal";
import NotFound from "../../pages/NotFound";
import useAuth from "../../hooks/useAuth";
import PrivateRoute from "../components/PrivateRoute";
import GuestRoute from "../components/GuestRoute";
import {
  CircularProgress,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import Agree from "../../pages/Agree";
import PostIdPage from "../../pages/PostIdPage/PostIdPage";
import Statistic from "../../pages/Statistic";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AppRoutes() {
  const classes = useStyles();
  const auth = useAuth();

  return auth.isLoaded ? (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route
            path="/statistic"
            exact={true}
            element={
                <PrivateRoute>
                    <Statistic />
                </PrivateRoute>
            }
        />
      <Route
        path="/posts"
        exact={true}
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
        <Route
            path="/posts/:id"
            exact={true}
            element={
                <PrivateRoute>
                    <PostIdPage />
                </PrivateRoute>
            }
        />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
        <Route
            path="/agree"
            element={
                <GuestRoute>
                    <Agree/>
                </GuestRoute>
            }
        />

      <Route path="/not-found-404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found-404" />} />
    </Routes>
  ) : (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppRoutes;
