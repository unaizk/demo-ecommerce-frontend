import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApliSlice';
import { logout } from '../slices/authSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [logoutApiCall, {isLoading}] = useLogoutMutation()
  const { userInfo } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async() => {
    try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/')
    } catch (err) {
        console.log(err);
    }
    
  };

  return (
    <div className="flex flex-col md:flex-row justify-around items-stretch pt-2 pb-2">
      <div className="flex items-center mx-auto md:mx-0 lg:mx-0">
        <img onClick={() =>{navigate('/')}} className="w-24 cursor-pointer" src={'/logo.png'} alt="Company Logo" />
      </div>
      <div className="sm:flex items-center mx-auto md:mx-0 lg:mx-0">
        <SearchBar  />
      </div>
      <div className="flex items-center mx-auto md:mx-0 lg:mx-0">
        <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
          {userInfo ? `Welcome ${userInfo.name}` : <img src={'/profile.jpg'} className="w-5 bg-gray-200" alt="" />}
        </div>
        <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
          <img src={'/Heart.png'} className="w-5 bg-gray-200" alt="" />
        </div>
        <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
          <img onClick={() =>{navigate('/cart')}} src={'/cart.png'} className="w-5 bg-gray-200" alt="" />
        </div>
        <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
          {userInfo ? (
            <span className="font-bold" onClick={handleLogoutClick}>
              Log Out
            </span>
          ) : (
            <span className="font-bold" onClick={handleLoginClick}>
              Log In
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
