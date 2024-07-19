
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import img from "../assets/imggg.jpg";


const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const password = watch('password'); // Watch for changes in the password field

    const submitHandler = (data) => {
        const { email, password, firstName, lastName } = data;
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user already exists
        const userExists = existingUsers.some(user => user.email === email);

        if (userExists) {
            alert("User already exists!");
        } else {
            // Save the new user data to local storage
            const updatedUsers = [...existingUsers, { email, password, firstName, lastName }];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            alert("Registration successful!");
            // Navigate to login page after successful registration
            navigate('/log-in');
        }
    };

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
                           <img src={img}></img>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
                        <div>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                Create your Account!
                            </p>
                            <p className='text-center text-base text-gray-700'>
                                Keep your privacy secured
                            </p>
                        </div>
                        <Textbox
                            placeholder='First Name'
                            type='text'
                            name='firstName'
                            label='First Name'
                            className='w-full rounded-full'
                            register={register("firstName", {
                                required: "First Name is required!",
                            })}
                            error={errors.firstName ? errors.firstName.message : ""}
                        />
                        <Textbox
                            placeholder='Last Name'
                            type='text'
                            name='lastName'
                            label='Last Name'
                            className='w-full rounded-full'
                            register={register("lastName", {
                                required: "Last Name is required!",
                            })}
                            error={errors.lastName ? errors.lastName.message : ""}
                        />
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
                        <Textbox
                            placeholder='******'
                            type='password'
                            name='confirmPassword'
                            label='Confirm Password'
                            className='w-full rounded-full'
                            register={register("confirmPassword", {
                                required: "Please confirm your password!",
                                validate: value =>
                                    value === password || "The passwords do not match"
                            })}
                            error={errors.confirmPassword ? errors.confirmPassword.message : ""}
                        />
                        <Button
                            type='submit'
                            label='Register'
                            className='w-full h-10 bg-blue-700 text-white rounded-full'
                        />
                        <p className='text-sm text-center'>
                            Already have an account?
                            <Link to="/log-in" className='text-blue-600 underline'>
                                Log In Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
