import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
    const {user}=useAuth()
    const axiosSecure=useAxios()
    const {data:role="buyer",isLoading:adminloading}=useQuery({
        queryKey:["user-role",user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user/${user.email}/role`)
            return res.data?.role || "buyer";

        }
    })
    return {role,adminloading}
};

export default useRole;