import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import NavBar from './NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import Home from './Home';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import Profile from './Profile';
import SignupForm from './SignupForm';
import Spinner from './Spinner';
import JoblyAPI from './JoblyAPI';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext';
import jwt from 'jsonwebtoken';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('tokenKey');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    /* If the value of token changes the refresh all of the user info stored
    /* in localstorage and on the UserContext */
    async function getUser() {
      if (token) {
        try {
          // Make token value accessible in the api component
          JoblyAPI.token = token;
          // Get username from from jwt
          let { username } = jwt.decode(token);
          // Find current user based on user name return from jwt
          let currentUser = await JoblyAPI.getUser(username);
          // Set user in app state
          setUser(currentUser);
        } catch (err) {
          console.error(err.message);
          setUser(null);
        }
      } else {
        // No token so explicitly set user to null here
        setUser(null);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getUser();
  }, [token]);

  const addUser = async (newUser) => {
    try {
      // Add user via api and get token that is returned from POST request
      const userToken = await JoblyAPI.addUser(newUser);
      // Set token to trigger useEffect
      setToken(userToken);
      //clear previous errors
      setErrorMessage(null);
    } catch (e) {
      setToken(null);
      setErrorMessage({ type: 'signup', message: e });
      console.log('Add user error:', e);
    }
  };

  const updateUser = async (existingUser) => {
    try {
      // Rerun login user to make sure they provided correct password before updating profile
      const loginSuccess = await loginUser({
        username: user.username,
        password: existingUser.password,
      });
      if (!loginSuccess) {
        return;
      }
      // Update user via api and get new updated object that is returned from PATCH request
      const updatedUser = await JoblyAPI.updateUser(
        user.username,
        existingUser
      );
      // Set updated user
      setUser(updatedUser);
      // clear previous errors
      setErrorMessage(null);
      // return true for successful update
      return true;
    } catch (e) {
      // setToken(null);
      setErrorMessage({ type: 'update', message: e });
      console.log('Update user error:', e);
      // return true for unsuccessful update
      return false;
    }
  };

  const loginUser = async (userToLogin) => {
    try {
      // Login user via api and get token that is returned from POST request
      const userToken = await JoblyAPI.loginUser(userToLogin);
      // Set token to trigger useEffect
      setToken(userToken);
      //clear previous errors
      setErrorMessage(null);
      // return true for successful login
      return true;
    } catch (e) {
      setToken(null);
      setErrorMessage({ type: 'login', message: e });
      console.log('Login user error:', e);
      // return true for unsuccessful login
      return false;
    }
  };

  const logout = () => {
    try {
      setToken(null);
    } catch (e) {
      setToken(null);
      console.log('Logout user error:', e);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      // Link user to a job posting based on username and jobId
      await JoblyAPI.applyToJob(user, jobId);
      // clear previous errors
      setErrorMessage(null);

      setUser({ ...user, applications: [...user.applications, jobId] });
      // return true for successful update
      return true;
    } catch (e) {
      setErrorMessage({ type: 'job', message: e });
      console.log('Apply user to job error:', e);
      // return true for unsuccessful update
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <NavBar logout={logout} />
        {isLoading ? (
          <Spinner />
        ) : (
          <main>
            <Container>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/companies'>
                  <CompanyList />
                </Route>
                <Route path='/companies/:handle'>
                  <CompanyDetail applyToJob={applyToJob} />
                </Route>
                <Route exact path='/jobs'>
                  <JobsList applyToJob={applyToJob} />
                </Route>
                <Route exact path='/profile'>
                  <Profile updateUser={updateUser} error={errorMessage} />
                </Route>
                <Route path='/login'>
                  <LoginForm loginUser={loginUser} error={errorMessage} />
                </Route>
                <Route path='/signup'>
                  <SignupForm addUser={addUser} error={errorMessage} />
                </Route>
                <Route>
                  <div>Not Found Component</div>
                </Route>
              </Switch>
            </Container>
          </main>
        )}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
