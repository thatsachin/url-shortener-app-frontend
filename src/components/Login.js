import React, { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../AppContext';

// const Auth = () => {

//     const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
//     const navigate = useNavigate();

//     const checkLogin = async () => {
//       const response = await axios.get('http://localhost:5000/api/v1/auth/check-login');

//       if (response.data.success) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLogin();

//     if (isLoggedIn) {
//         return navigate("/app");
//     }
//     else {
//         return navigate("/login");  
//     }
// }

//A modern sleek designed signin form component with email and password input field with label and also a form validation error/warning text.

function isValidEmail(email) {
    // Regular expression to match a valid email address.
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    // Return true if the email address matches the regular expression, false otherwise.
    return emailRegex.test(email);
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Login');
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/app");
    }
  }, []);

//   Auth();

  const loginTheUser = async (email, password) => {
      try {
        setButtonText('Loading...');
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
            email,
            password
        }, {
            withCredentials: true,
        })

        if(res.data.success) {
            toast.success(res.data.message);
            setErrorMessage('');
            setEmail('');
            setPassword('');
            setIsLoggedIn(true);
            setTimeout(() => {
                navigate("/app");
            }, 1000)
        } else {
            toast.error(res.data.message);
        }

        setButtonText('Login');
        setLoading(false);
      }
      catch(error) {
          toast.error("Some error occurred!");
          console.log(error);
      }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password!');
    }
    else if (!isValidEmail(email)) {
        setErrorMessage('Email Id is invalid!');
    }
    else {
        loginTheUser(email, password);
      // Submit form
      // console.log('Login Form submitted\n\n');
      // console.log('\nEmail-ID: ', email);
      // console.log('\nPassword: ', password);
    }

    // Perform login logic here

    // setErrorMessage('');
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div><Toaster /></div>
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full min-w-[250px] border border-gray-300 rounded-lg p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mb-5 w-full min-w-[200px] border border-gray-300 rounded-lg p-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full min-w-[200px] active:bg-blue-500 active:opacity-80 outline-none bg-blue-500 text-white rounded-lg py-2 font-medium"
          >
            {buttonText}
          </button>
        </form>
      </div>
      <div className='flex items-center justify-center m-4 flex-col'>
        <div className='flex items-center justify-center mb-4'>
            <div className="w-28 h-[0.1rem] bg-slate-400"></div>
            <h1 className="text-sm mx-4">or</h1>
            <div className="w-28 h-[0.1rem] bg-slate-400"></div>
        </div>
        <p className='text-sm text-black'>Cick here to <Link className='text-[#0c75ff]' to="/register">Sign Up</Link>.</p>
      </div>
    </div>
  );
};

export default Login;