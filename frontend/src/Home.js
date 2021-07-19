import React, { useContext } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <div className='home-content'>
        <h1>Jobly</h1>
        <p className='home-slogan'>All the jobs, in one convenient place</p>
        {user ? (
          <h1>Welcome back, {user.firstName}</h1>
        ) : (
          <div className='home-button-container'>
            <Link to='/login'>
              <Button size='large' color='primary'>
                Login
              </Button>
            </Link>
            <Link to='signup'>
              <Button size='large' color='primary'>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
