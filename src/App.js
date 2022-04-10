
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import useAuth from "./hooks/useAuth";
import logo from "./logo.png";

const useStyles = makeStyles((theme) => ({
  root: {

    flexGrow: 1,
  },
  nav: {
    background: '#639593',
  },
  rightToolbar: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.logOut();
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar >
          <img
              src={logo}
          />
          <Typography variant="h6" className={classes.title}  sx={{ mr: 2, display: { xs: 'none', md: 'none' } }}>
            HealthCare
          </Typography>

          {auth.isLoaded &&
            (auth.user ? (
              <>
              <div className={classes.rightToolbar}>
                <Button color="inherit" component={Link} to="/statistic" >
                  Статистика
                </Button>
                <Button color="inherit" component={Link} to="/posts">
                  Обращения
                </Button>
              </div>
                <Button color="inherit" onClick={onLogOut}>
                  Выйти
                </Button>
              </>

            ) : (
              <>

              </>
            ))}
        </Toolbar>
      </AppBar>

      <Routes />
    </div>
  );
}

export default App;

