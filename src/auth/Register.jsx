import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import SocialLogin from './social/SocialLogin';
import { data, Link } from 'react-router';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const Register = () => {
    const axiosSecure = useAxios();

    const { userRegister, updateUser } = useAuth();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handelRegister = async (data) => {
        setSuccess("");
        setError("");

        try {
            // step 1: firebase register
            const result = await userRegister(data.email, data.password);

            // step 2: upload image to imgbb
            const formData = new FormData();
            formData.append("image", data.photo[0]);

            const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb_key}`;

            const uploadRes = await axios.post(image_api_url, formData);
            const imageUrl = uploadRes.data.data.url;

            // step 3: save user in database
            const userData = {
                email: data.email,
                displayName: data.name,
                photoURL: imageUrl,
                role:data.role
            };


            const dbRes = await axiosSecure.post("/user", userData);


            await updateUser({
                displayName: data.name,
                photoURL: imageUrl
            });

            if (dbRes.data.insertedId) {
                setSuccess("User registered successfully!");
                reset();
            }

        } catch (err) {
            console.log("Error:", err);
            setError("Registration failed! Please try again.");
        }
    };
console.log(data);

    return (
        <div className="card w-full mx-auto max-w-sm p-4 shadow-md">
            <h3 className="text-2xl font-bold text-center">Create an Account</h3>
            <p className="text-center mb-2">Register with ZapShift</p>

            <form className="w-full" onSubmit={handleSubmit(handelRegister)}>
                <fieldset className="fieldset">

                    {/* Name */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        className="input w-full"
                        {...register("name", { required: true })}
                        placeholder="Your Name"
                    />
                    {errors.name && (
                        <p className="text-red-500">Name is required</p>
                    )}

                    {/* Email */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input w-full"
                        {...register("email", { required: true })}
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}

                    {/* Photo */}
                    <label className="label">Profile Photo</label>
                    <input
                        type="file"
                        className="file-input w-full"
                        {...register("photo", { required: true })}
                    />
                    {errors.photo && (
                        <p className="text-red-500">Photo is required</p>
                    )}
                    {/* user role */}
                    <select defaultValue="Pick a language" className="select w-full select-secondary" {...register("role",{required:true})}>
                        <option disabled={true}>Pick a Role</option>
                        <option>Buyer</option>
                        <option>Manager</option>
                       
                    </select>

                    {/* Password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input w-full"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
                        })}
                        placeholder="Password"
                    />

                    {errors.password?.type === "required" && (
                        <p className="text-red-500">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="text-red-500">
                            Password must be at least 6 characters
                        </p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className="text-red-500">
                            Must contain uppercase, lowercase & number
                        </p>
                    )}

                    <button className="btn btn-neutral mt-4 w-full">Register</button>

                    {/* Success Message */}
                    {success && (
                        <p className="text-green-600 text-center mt-2">{success}</p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 text-center mt-2">{error}</p>
                    )}
                </fieldset>

                <p className="mt-2 text-sm">
                    Already have an account?
                    <Link className="text-blue-500 underline pl-1" to="/login">
                        Login
                    </Link>
                </p>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Register;
