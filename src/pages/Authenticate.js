import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Authenticate } from '../store/SigninStore';
import { useLocalStorage } from 'react-use-storage'
const AuthenticatePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin,setIsLogin] = useLocalStorage('isLogin', false)
  const [token,setToken] = useLocalStorage('token', '')
  const [role,setRole]= useLocalStorage('role','');
  const dispatch = useDispatch();
  const {SigninStore} = useSelector(state => state)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);
    const Data = {
      username,
      password
  }
    dispatch(Authenticate(Data))
    // Reset the form
    setUsername('');
    setPassword('');
  };
  useEffect(()=>{
    if(SigninStore.isAuth){
      setToken(SigninStore.token);
      setIsLogin(true);
      setRole(SigninStore.role);
      window.location = '/home';
    }
  },[SigninStore.isAuth])
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticatePage;