import '../styles/Register.css';
import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../AppContext';


function isValidEmail(email) {
    // Regular expression to match a valid email address.
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    // Return true if the email address matches the regular expression, false otherwise.
    return emailRegex.test(email);
}


//A modern sleek designed signup form component with full name, email, password and confirm password input field with label and also a form validation error/warning text.

const Register = () => {

  const { isLoggedIn } = useContext(AppContext);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Sign Up');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/app");
    }
  },[isLoggedIn]);

  const registerTheUser = async (fullName, email, password) => {
    try {
        setButtonText('Loading...');
        setLoading(true);
        const res = await axios.post("https://url-shortener-backend-szjh.onrender.com/api/v1/auth/register", {
            fullName,
            email,
            password
        })

        if(res.data.success) {
            toast.success(res.data.message);
            setErrorMessage('');
            setFullname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                navigate("/login");
            }, 1500)
        } else {
            toast.error(res.data.message);
        }
        
        setButtonText('Sign Up');
        setLoading(false);
    }
    catch(error) {
        toast.error("Some error occurred!");
        console.log(error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    if (!fullname || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields!');
    }
    else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
    }
    else if (!isValidEmail(email)) {
        setErrorMessage('Email Id is invalid!');
    }
    else {
        registerTheUser(fullname, email, password);
        // setErrorMessage('');
        // toast.success("Registered Successfully.");


      // Submit form
      // console.log('Form submitted\n\n');
      // console.log('Full Name: ', fullname);
      // console.log('\nEmail-ID: ', email);
      // console.log('\nPassword: ', password);
      // console.log('Confirm Password: ', confirmPassword);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div><Toaster position="top-center"/></div>
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-10">Sign Up</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-500 active:opacity-80 outline-none transition duration-300 mt-10"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
      <div className='flex items-center justify-center m-4 flex-col'>
        <div className='flex items-center justify-center mb-4'>
            <div className="w-28 h-[0.1rem] bg-slate-400"></div>
            <h1 className="text-sm mx-4">or</h1>
            <div className="w-28 h-[0.1rem] bg-slate-400"></div>
        </div>
        <p className='text-sm text-black'>Cick here to <Link className='text-[#0c75ff]' to="/login">Login</Link>.</p>
      </div>
    </div>
  );
};

export default Register;
