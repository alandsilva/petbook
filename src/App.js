import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
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
import Profile from './components/profile/Profile';
import PostDetails from './components/posts/PostDetails';
import Banner from './components/layout/Banner';
import Header from './components/ui/Header';
import Notifications from './components/profile/Notifications';

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

axios.defaults.baseURL =
  'https://us-central1-petbook-cb3c1.cloudfunctions.net/api';

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
          <div className='body'>
            <Router>
              <div className='sidebar'>
                <Navbar />
              </div>
              <div className='main'>
                <Header />
                <hr />
                <div className='content'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login'>
                      {!authenticated ? <Login /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/signup'>
                      {!authenticated ? <Signup /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/account'>
                      {authenticated ? <Profile /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/notifications'>
                      {authenticated ? <Notifications /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/users/:handle' component={User} />
                    <Route
                      exact
                      path='/users/:handle/posts/:postId'
                      component={User}
                    />
                    <Route
                      exact
                      path='/posts/:postId/'
                      component={PostDetails}
                    />
                  </Switch>
                </div>
              </div>
              <div class='generic'>
                <Banner />
              </div>
            </Router>
          </div>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
