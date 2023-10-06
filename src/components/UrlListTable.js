import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppContext from '../AppContext';

const UrlListTable = () => {
  const {shortUrl} = useContext(AppContext);
  const [urlsData, setUrlsData] = useState([]);

  function copyLinkToClipboard(value) {
    navigator.clipboard.writeText(value);
    toast.success("Copied to Clipboard!");
  }

  async function getAllUrlsData() {
      try {
          const response = await axios.get("http://localhost:5000/api/v1/url/info",{withCredentials: true});

          if(response.status === 200) {
              setUrlsData(response.data);
          }
          else {
              toast.error("Error Occured While Fetching Urls Data for the table!");
          }
      }
      catch(error) {
        console.log(error);
      }
  }

  useEffect(() => {
    getAllUrlsData();
  }, [shortUrl]);

  return (
    <div className="flex items-center justify-center max-w-full h-auto py-2 mb-12 myurltable sm:px-6 lg:px-2">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  <input
                        type="checkbox"
                        name="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Total Clicks
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urlsData.length > 0 ?  urlsData.toReversed().map((data, index) => {
                  return <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          value={data.shortUrlId}
                          type="checkbox"
                          name="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className=" cursor-pointer px-6 py-4 whitespace-nowrap">
                      <div onClick={() => copyLinkToClipboard(`http://localhost:5000/${data.shortUrlId}/`)} className="text-sm text-[#0c75ff] italic">{`http://localhost:5000/${data.shortUrlId}/`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">{data.totalClicks}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-min">
                      <div onClick={() => copyLinkToClipboard(data.destinationUrl)} className="cursor-pointer text-sm text-[#0c75ff] italic">{(data.destinationUrl).length > 30 ? (data.destinationUrl).substring(0, 30) + '....' : data.destinationUrl}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">{data.creationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="edit-button w-[20px] h-[20px] mr-2">
                       <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/edit--v1.png" alt="edit--v1"/>
                      </button>
                      <button className="delete-button w-[20px] h-[20px]">
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" alt="filled-trash"/>
                      </button>
                    </td>
                  </tr>
                }) : null} 
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default UrlListTable;