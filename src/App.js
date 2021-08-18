import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';

// Components
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      light: '#33c9dc',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff3d00',
      light: '#ff6333',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
});

const token = localStorage.FBToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  let authenticated = store.getState().user.authenticated;
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login'>
                  {!authenticated ? <Login /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/signup'>
                  {!authenticated ? <Signup /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/users/:handle' component={User} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
