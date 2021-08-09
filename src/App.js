import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

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

// let authenticated;
// const token = localStorage.FBToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = '/login';
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
