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
    <div className="flex min-h-screen items-center justify-arounf bg-gray-50">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm animate-fadeIn">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>

    <div className="mt-10">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-around rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        New here?{' '}
        <button onClick={handleSignupRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign up
        </button>
      </p>
    </div>
  </div>

  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-in-out;
    }
  `}</style>
</div>
  )
}


export default LoginPage;
