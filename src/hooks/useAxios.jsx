import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure=axios.create({
    baseURL:"https://zap-shift-server-alpha-six.vercel.app"
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
    // interceptor response if user give valid 
    // token but want another data emidialty log out from  current page and send to login page 
    const resInterceptor=axiosSecure.interceptors.response.use((response)=> {
    
    return response;
  }, (error)=> {
    console.log(error);
   const statusCod = error.response?.status;

    if (statusCod===401 || statusCod===403) {
        signout()
        .then(()=>{
            navigate("/login")

        })
        }

    
    
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