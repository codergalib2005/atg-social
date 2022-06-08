import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import image from '../assets/login.gif';
const Register = () => {
    const [userName, setUserName] = useState('');
    const [thisUserName, setThisUserName] = useState("");
    const location = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // Generate User name
    const generateUserName = () => {
        if (!userName) {
            alert("Please enter your name");
            return;
        } else {
            let generator = userName
            let result = generator.replaceAll(" ", "");
            let result2 = result.replaceAll('"', "");
            let result3 = result2.replaceAll("'", "");
            let result4 = result3.replaceAll(".", "");
            let result5 = result4.replaceAll("/", "");
            let result6 = result5.replaceAll("\\", "");
            let result7 = result6.replaceAll("!", "");
            let result8 = result7.replaceAll("@", "");
            let result9 = result8.replaceAll("#", "");
            let result10 = result9.replaceAll("$", "");
            let result11 = result10.replaceAll("%", "");
            let result12 = result11.replaceAll("^", "");
            let result13 = result12.replaceAll("&", "");
            let result14 = result13.replaceAll("*", "");
            let result15 = result14.replaceAll("(", "");
            let result16 = result15.replaceAll(")", "");
            let result17 = result16.replaceAll("_", "");
            let result18 = result17.replaceAll("+", "");
            let result19 = result18.replaceAll("=", "");
            let result20 = result19.replaceAll("{", "");
            let result21 = result20.replaceAll("}", "");
            let result22 = result21.replaceAll("[", "");
            let result23 = result22.replaceAll("]", "");
            let result24 = result23.replaceAll("|", "");
            let result25 = result24.replaceAll(";", "");
            let result26 = result25.replaceAll(":", "");
            let result27 = result26.replaceAll("<", "");
            let result28 = result27.replaceAll(">", "");
            let result29 = result28.replaceAll("?", "");
            let result30 = result29.replaceAll("~", "");
            let result31 = result30.replaceAll("`", "")?.toLowerCase()?.slice(0, 10);
            const number = Math.floor(Math.random(1000) * 2000);
            let username = result31 + number;
            setThisUserName(username);
            
        }
    }
    const handleCopyUsername = () => {
        navigator.clipboard.writeText(thisUserName);
        alert("Copied to clipboard");
    }
    const onSubmit = async data => {
        try {
            if (!thisUserName) {
                alert("Please generate and copy a username before submitting");
                return;
            } else {
                const response = await axios.post('https://sheltered-meadow-26881.herokuapp.com/api/auth/signup', {
                    username: thisUserName,
                    password: data.password,
                    name: userName,
                    email: data.email,
                    avatar: ""
                })
                if (response.status === 201) {
                    alert("Successfully Registered");
                    location("/login");
                }
            }
        } catch (err) {
            if (err.response.data.error === "User already exist") {
                alert("User already exist");
                return
            }
        }
    };
    return (
        <div>
            <div className="container mx-auto px-4 min-h-screen">
                <div className="items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <img src={image} alt="Login Page images" />
                    </div>
                    <div>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {
                                thisUserName && <div className="mb-4">
                                    <span className='tooltip' onClick={() => handleCopyUsername()}
                                    >{thisUserName}
                                        <span className='tooltip-body'>Copy to click on username</span>
                                    </span>
                                    <div>
                                        <button title='Click on this button for generate new username' onClick={() => generateUserName()}
                                            data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Make New Username
                                        </button>
                                        <div id="tooltip-hover" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            Tooltip content
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </div>
                                </div>
                            }{
                                !thisUserName && <div className="mb-4">
                                    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => generateUserName()}>Make Username
                                    </button>
                                </div>
                            }
                            <label className="block text-gray-700 text-md font-bold mb-1 mt-3" htmlFor="name">
                                Full Name
                            </label>
                            <input onChange={e => setUserName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Full Name"
                            />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-md font-bold mt-3" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1" id="email" type="email" placeholder="E-mail"
                                        {...register("email", { required: true })}
                                    />
                                    <label className="block text-gray-700 text-md font-bold mt-3" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1" id="password" type="password" placeholder="Password"
                                        name="password"
                                        {...register("password", { required: true })}
                                    />
                                    <button onClick={handleSubmit} className="bg-[#407bff] py-2 px-5 border-2 border-white shadow-lg mt-4 text-white" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;