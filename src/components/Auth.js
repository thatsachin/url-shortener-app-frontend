import { useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../AppContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();


  useEffect(() => {
    const checkLogin = async () => {
      const response = await axios.get('http://localhost:5000/api/v1/auth/check-login');
      console.log(response.data.success);
      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (isLoggedIn) {
        return navigate("/app");
      }
      else {
        return navigate("/login");
      }
    };

    checkLogin();
  }, []);

}
export default Auth;