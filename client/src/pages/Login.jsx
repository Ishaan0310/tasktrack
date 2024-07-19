import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice'; 

const Login = () => {
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitHandler = (data) => {
        const { email, password } = data;
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verify user credentials
        const user = existingUsers.find(user => user.email === email && user.password === password);
        
        if (user) {
            dispatch(setCredentials(user)); // Set user credentials in Redux state
        } else {
            alert("Invalid credentials!");
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/dashboard"); // Navigate to dashboard if user is authenticated
        }
    }, [user, navigate]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-blue-400'>
                            A Place where you can Manage your Work
                        </span>
                        <p>
                            <span className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7x1 font-black text-center text-blue-700'>
                                Task
                            </span>
                            <span className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7x1 font-black text-center text-black-700'>
                                Trek
                            </span>
                        </p>
                        <div className='task-container'>
                            <div className='task-circle'></div>
                            <div className='task-circle'></div>
                            <div className='task-circle'></div>
                            <div className='task-circle'></div>
                            <div className='task-circle'></div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
                        <div>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                Welcome Back!
                            </p>
                            <p className='text-center text-base text-gray-700'>
                                Keep your privacy secured
                            </p>
                        </div>
                        <Textbox
                            placeholder='yourmail@eg.com'
                            type='email'
                            name='email'
                            label='Email Address'
                            className='w-full rounded-full'
                            register={register("email", {
                                required: "Email is required!",
                            })}
                            error={errors.email ? errors.email.message : ""}
                        />
                        <Textbox
                            placeholder='******'
                            type='password'
                            name='password'
                            label='Password'
                            className='w-full rounded-full'
                            register={register("password", {
                                required: "Password is required!",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <Button
                            type='submit'
                            label='Login'
                            className='w-full h-10 bg-blue-700 text-white rounded-full'
                        />
                        <p className='text-sm text-center'>
                            Don't have an account?
                            <Link to="/register" className='text-blue-600 underline'>
                                Register Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
