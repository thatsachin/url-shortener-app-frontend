import React, { useEffect, useContext } from 'react';
import CreateUrlInput from './CreateUrlInput';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import UrlListTable from './UrlListTable';
import {Toaster} from 'react-hot-toast';

const UrlApp = () => {

    const { isLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
          navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <div className='w-full h-full'>
            <div><Toaster /></div>
            <CreateUrlInput />
            <UrlListTable />
        </div>
    )
}

export default UrlApp
