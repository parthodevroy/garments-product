import axios from 'axios';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure=axios.create({
    baseURL:"https://garments-management-server.vercel.app"
})

const useAxios = () => {
    const navigate=useNavigate()
    const {user, signout}=useAuth()
    // console.log(user);
    
   useEffect(()=>{
   const Interceptor=axiosSecure.interceptors.request.use(config=>{
        config.headers.Authorization=`Bearer ${user.accessToken}`

        return config
    })
     
    const resInterceptor=axiosSecure.interceptors.response.use((response)=> {
    
    return response;
  }, (error)=> {
    console.log(error);
   const statusCod = error.response?.status;

    
    
    return Promise.reject(error);
  });
    // interceptor (call  here  and log out )
    return()=>{
        axiosSecure.interceptors.request.eject(Interceptor)
        axiosSecure.interceptors.response.eject(resInterceptor)
    }

   },[user,signout,navigate])

    
    return axiosSecure
};

export default useAxios;