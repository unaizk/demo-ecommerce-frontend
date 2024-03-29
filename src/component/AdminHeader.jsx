import React from 'react';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import { adminLogout } from '../slices/adminAuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [adminLogoutApiCall] = useAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await adminLogoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate('/admin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {adminInfo ? (
        <div className="flex flex-col md:flex-row justify-between items-stretch pt-2 pb-2 ml-5">
        <div className="flex items-center mx-auto md:mx-0 lg:mx-0 ">
          <img onClick={() =>{navigate('/admin')}} className="w-24 cursor-pointer" src={'/logo.png'} alt="Company Logo" /><span className='font-bold'>Admin</span>
        </div>
        <div className="flex items-center mr-10 mx-auto md:mx-0 lg:mx-0">
          <div className="sm:mt-5 bg-gray-50 rounded-full p-3 mr-4 cursor-pointer ">
            <p className='mx-auto text-sm'>{ `Welcome ${adminInfo.name}` }</p>
            
          </div>
          <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
            <span className='font-bold mx-auto text-sm' onClick={() => navigate('/admin/addProduct')}>Add Products</span>
          </div>
          <div className="bg-gray-50 rounded-full p-3 mr-4 cursor-pointer">
              <span className="font-bold mx-auto text-sm" onClick={handleLogoutClick}>
                Log Out
              </span>
          </div>
        </div>
      </div>
      ) : (
        <div className="flex flex-start md:flex-row items-stretch pt-2 pb-2 ml-5 mx-auto md:mx-0 lg:mx-0">
          <img
            onClick={() => navigate('/admin')}
            className="w-24 ml-5 cursor-pointer"
            src={'/logo.png'}
            alt="Company Logo"
          />
          <span className="font-bold">Admin</span>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
