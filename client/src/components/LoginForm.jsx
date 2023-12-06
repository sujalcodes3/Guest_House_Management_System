import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        validateForm();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };

    const validateForm = () => {
        setIsFormValid(username !== "" && password !== "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className='flex flex-col items-center gap-3 justify-center h-screen bg-gray-900'>
            <form className='bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-white mb-4'>Login</h2>
                <div className='mb-4'>
                    <label htmlFor='username' className='text-white'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        className='w-full bg-gray-700 text-white rounded-lg py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='text-white'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full bg-gray-700 text-white rounded-lg py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <Link to='/dashboard'>
                    <button
                        type='submit'
                        className={`bg-blue-600 text-white rounded-lg py-2 px-4 mt-4 ${
                            isFormValid ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!isFormValid}
                        // onClick={handleSubmit}
                    >
                        Login
                    </button>
                </Link>
                <p className='text-white mt-4'>
                    Don't have an account?{" "}
                    <Link to='/' className={`hover:text-blue-500`}>
                        Register
                    </Link>
                </p>
            </form>
            <div className='text-white text-center h-12 bg-blue-600 flex items-center w-full rounded-lg justify-center hover:bg-transparent hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-500'>
                <Link to='/' className={`text-xl `}>
                    Back
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
