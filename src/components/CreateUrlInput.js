import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppContext from '../AppContext';

const CreateUrlInput = () => {

  const [destinationUrl, setDestinationUrl] = useState('');
  const {shortUrl, setShortUrl, setIsLoggedIn} = useContext(AppContext);
  const [disableGenerateBtn, setDisableGenerateBtn] = useState(false);

  const handleInputChange = (e) => {
    setDestinationUrl(e.target.value);
  }

  function copyLinkToClipboard() {

    if(shortUrl.length <= 0) {
      toast.error("Short Url is Empty!");
      return;
    }

    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to Clipboard!");
  }

  const isValidUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return regex.test(url);
  }

  async function generateShortUrl() {
    try {

      if(isValidUrl(destinationUrl)) {
        setDisableGenerateBtn(true);
        setShortUrl('Loading...');
        const response = await axios.post("http://localhost:5000/api/v1/url/create", {
          destinationUrl
        },{ withCredentials: true });
        setDisableGenerateBtn(false);
        if(response.data.success) {
          toast.success("Short Url Generated!");
          setShortUrl(response.data.shortUrl);
          setDestinationUrl('https://example.com/');
        }
        else {
          setShortUrl('Loading...');
          toast.error("Error Occured, Please try again!");
        }

      }
      else {
        toast.error("Invalid URL, please enter a valid URL!");
      }

    }
    catch(error) {
      console.log(error);
    }
  }

  async function getUserLogout(){
    try {
      const response = await axios.get("http://localhost:5000/api/v1/auth/logout", {withCredentials: true});
      if(response.data.success) {
        setIsLoggedIn(false);
      } else {
        toast.error("Some Error Occured While Logging Out, Please try again!");
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
        {/* // a navbar with a logo text on the left using tailwindcss */}
      <div className="bg-white w-full h-16 px-10 flex justify-between items-center shadow">
        <p className="text-[#0c75ff] text-2xl font-semibold">URL Shortener App</p>
        <button onClick={getUserLogout} className='cursor-pointer px-4 py-2 active:opacity-90 active:bg-[#0c75ff] hover:bg-[#285aff] bg-[#6073ff] text-white rounded'>Logout</button>
      </div>
      <div className='bg-slate-100 w-full h-64 px-10 flex flex-col justify-center items-center mb-16'>
        <div className='flex flex-col w-max h-max items-center justify-center bg-white p-4 rounded-lg'>
          <div className="flex justify-center items-center">
            <input value={destinationUrl} onChange={handleInputChange} type="text" placeholder="Enter your Short URL" className="border-slate-100 border w-[28rem] h-10 px-3 text-[0.9rem] rounded-l-md outline-1 outline-slate-100 text-slate-500" />
            <button disabled={disableGenerateBtn} onClick={generateShortUrl} className="bg-[#0c75ff] active:opacity-90 active:bg-[#0c75ff] hover:bg-[#1f73e2] rounded-r-md w-28 h-10 text-white">Shorten URL</button>
          </div>
          <div className='flex w-full justify-between items-center bg-white px-4 py-[0.35rem] rounded-b-md mt-2'>
            <p onClick={copyLinkToClipboard} className='text-[#0c75ff] text-sm'>{shortUrl}</p>
            <button onClick={copyLinkToClipboard} className='flex items-center text-sm'>
              <img className='w-[0.85rem] h-4' src="https://cdn-icons-png.flaticon.com/512/282/282163.png" alt="Notepad Icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUrlInput
