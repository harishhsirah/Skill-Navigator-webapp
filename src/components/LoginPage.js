import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Include your CSS file
import axios from 'axios';

const LoginPage = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.get('http://localhost:8000/login/', {
        params: { email, password }
      });

      

      alert(response.data.message);
      console.log(response.data.user);
      setIsLoggedIn(true); // Update the login status

      navigate('/dashboard'); // Redirect to the dashboard page
      if (response.data.message === 'Login successful') {
        // After successful login, pass userEmail to Dashboard
        navigate('/dashboard', { state: { userEmail: email } })};
    } catch (error) {
      alert('Login failed. Check your credentials.');
    }
  };
  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>New here? <button onClick={handleSignupRedirect}>Sign up</button></p>
    </div>
  );
};


export default LoginPage;
