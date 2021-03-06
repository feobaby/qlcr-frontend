import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../services/axios';

export default function Profile(props) {
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
      // eslint-disable-next-line react/prop-types
      const updateUserData = await axios.patch(`/user/settings/${props.match.params.id}`,
        {
          firstName, lastName, email, password, phoneNumber, userName,
        });
      const { status } = updateUserData.data;
      if (status === 200) {
        history.push('/dashboard');
      }
    //   const { token } = updateUserData.data.data;
    //   window.localStorage.setItem('QLCRtoken', token);
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
      </form>
    </>
  );
}
