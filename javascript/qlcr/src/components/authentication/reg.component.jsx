import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../services/axios';

export default function Registration() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');

  function Load() {
    return (
      <p>Loading ...</p>
    );
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const userData = await axios.post('/user/signup',
        {
          firstName, lastName, email, password, phoneNumber, userName,
        });
      const { status } = userData.data;
      if (status === 201) {
        history.push('/dashboard');
      }
      const { token } = userData.data.data;
      console.log(token);
      window.localStorage.setItem('token', token);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Load />}
      <form onSubmit={handleSubmit} align="center">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={userName}
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Sign up" />
        <Link to={{ pathname: '/login' }}>
          <h5 align="center"> Log in.</h5>
        </Link>

        <Link to={{ pathname: '/resource' }}>
          <h5 align="center"> Add a resource.</h5>
        </Link>
      </form>
    </>
  );
}
