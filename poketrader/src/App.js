import { useContext, useEffect, useState } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import { blue } from '@material-ui/core/colors'
import { UserContext } from './data/contexts/UserContext'
import { LoaderContext } from './data/contexts/LoaderContext'

import Loader from './components/Loader'
import Routes from './routes';
import UserRoutes from './UserRoutes'

import './global.css'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
    },
    MuiSelect: {
      variant: 'outlined',
      fullWidth: true,
    }
  }
})

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(LoaderContext)

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        firebase.firestore().collection('users').doc(uid).onSnapshot((user) => {
          setCurrentUser(user.data());
          setIsLogged(true);
          setIsLoading(false);
        });
      } else {
        setIsLogged(false);
        setIsLoading(false);
      }
    });
  }, []);


  if (isLoading) {
    return <Loader />
  }

  if (!isLogged) {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }


  return (
    <ThemeProvider theme={theme}>
      <UserRoutes />
    </ThemeProvider>
  );
}



export default App;



