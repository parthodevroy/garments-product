import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { googleLogin } = useAuth();

  const handleGoogle = () => {
    googleLogin()
      .then(result => {
        const userData = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "Buyer", 
         
        };

        axios.post("http://localhost:3000/user", userData)
          .then(res => {
            console.log("User created via social login:", res.data);
            navigate(from, { replace: true });
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <p className='text-center pb-2'>Or</p>
      <button
        onClick={handleGoogle}
        className="btn flex items-center w-full bg-white text-black border-[#e5e5e5]"
      >
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
