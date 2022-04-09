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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightToolbar: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
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
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" className={classes.title}>
            HealthCare
          </Typography>
          <div className={classes.rightToolbar}>
          </div>
          {auth.isLoaded &&
            (auth.user ? (
              <>
                <Button color="inherit" component={Link} to="/statistic">
                  Статистика
                </Button>
                <Button color="inherit" component={Link} to="/posts">
                  Обращения
                </Button>
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
