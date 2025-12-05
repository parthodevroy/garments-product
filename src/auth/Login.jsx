import React from 'react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from './social/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';


const Login = () => {
  const navigate = useNavigate();
    const location = useLocation();

    
    const from = location.state?.from?.pathname || "/";


    
    const {userlogin}=useAuth()

    const {register,handleSubmit,formState:{errors}}=useForm()

    const handellogin=(data)=>{
        console.log(data);
        userlogin(data.email,data.password)
        .then(result=>{
            console.log(result);
             navigate(from, { replace: true });

            
        }).catch(err=>{
            console.log(err);
            
        })

    }
    return (
        <div className='card w-full mx-auto max-w-sm'>
            <h3 className='text-2xl font-bold text-center'>Welcome Back</h3>
            <p className='text-center'>Plese Login</p>
          <form className='w-full' onSubmit={handleSubmit(handellogin)}>
            <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input w-full" {...register("email",{required:true})} placeholder="Email" />
          {
            errors.email?.type==="required"&&<p className='text-red-500'>eamil requred</p>
          }

          {/* password */}
          <label className="label">Password</label>
          <input type="password" className="input w-full" {...register("password",{
            required:true,
            minLength:6,
             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
            })}  placeholder="Password" />
         {
            errors.password?.type==="required"&&<p className='text-red-500'>password requred</p>
          }
          {
            errors.password?.type==="minLength"&&<p className='text-red-500'>password must be longer 6 carecter</p>
          }
           {
            errors.password?.type==="pattern"&&<p className='text-red-500'>password must be one uper case one lower case and number</p>
          }
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

         <p>Create An Account Zap Shift<Link className='text-blue-500 underline pl-2' to={"/register"}>Register</Link></p>

          </form>
          <SocialLogin/>
        </div>
    );
};

export default Login;