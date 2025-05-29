import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: '',
        password: "",
        confirmPassword: "",
        gender: ''
    });
    
    const { loading, signup } = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(inputs);
    }

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender: gender});
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-border backdrop-filter backdrop-blur-lg backdrop-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login {" "}
                    <span className='text-blue-500'>Chat App</span>
                </h1>
                <form 
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="fullName" 
                            id="fullname" 
                            placeholder='Enter Full Name' 
                            className='w-full input input-bordered h-10' 
                            value={inputs.fullName}
                            onChange={(e)=> setInputs({...inputs, fullName: e.target.value})}
                            />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder='Enter Username' 
                            className='w-full input input-bordered h-10' 
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Enter Password' 
                            className='w-full input input-bordered h-10' 
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value})}
                            />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="cpassword" 
                            placeholder='Enter Confirm Password' 
                            className='w-full input input-bordered h-10' 
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value})}
                            />
                    </div>

                    {/* Gender Checkbox */}
                    <GenderCheckbox 
                        onCheckboxChange={handleCheckboxChange}
                        selectedGender={inputs.gender}
                    />

                    <Link to='/login' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button 
                            className='btn btn-block btn-sm mt-2'
                            disabled={loading}
                        >
                            { loading ? <span className='loading loading-spinner'></span> : "Signup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup