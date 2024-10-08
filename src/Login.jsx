import React, { useState } from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [_id, set_id] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('https://anshul-portfolio-admin-be.onrender.com/auth/login', {
            //     email: username,
            //     password: password,
            // });
            const response = await axios.post('http://localhost:3002/auth/login', {
                email: username,
                password: password,
            });
            localStorage.setItem('auth-token', response.data.token);
            navigate('/dashboard'); // Redirect to the Dashboard page
            try {
                const response_get = await axios.get('http://localhost:3002/portfolio/receive');
                const data = response_get.data;
                // console.log("below is the data");
                const temp_id = data[data.length - 1]._id

                // console.log(temp_id);

                if (temp_id) {
                    try {
                        // console.log("it is also here");
                        set_id(temp_id);
                    } catch (error) {
                        // console.log("not getting data");
                    }
                    // console.log(_id);

                }

            } catch (error) {
                console.error('Blank document', error);
                await axios.post('http://localhost:3002/portfolio/create-dummy', {
                    users: {
                        id: "1",
                        name: "",
                        resume: "",
                        github: "",
                        photo: ""
                    },
                    projects: [],
                    experiences: [],
                    educations: [],
                    skills: [],
                }, {
                    headers: {
                        'auth-token': response.data.token,
                    }
                });

            }

            // alert('Login successful!');

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> HeHe Anshul</h1>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && <div className="text-red-600">{error}</div>}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder='username'
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
