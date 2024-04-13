import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const BackendRoute = "https://sample-tracking.onrender.com";

    // Define state variables for form fields and loading state
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        department: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate password length
        if (name === "password" && value.length > 15) {
            return;
        }

        // Restrict phone number to 10 digits
        if (name === "phoneNumber" && value.length > 10) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        for (const key in formData) {
            if (formData[key] === '') {
                toast.error("Please fill all fields");
                return;
            }
        }

        // Validate phone number for India (10 digits)
        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(formData.phoneNumber)) {
            toast.error("Please enter a valid 10-digit phone number for India");
            return;
        }

        setIsLoading(true); // Set loading state to true

        try {
            console.log('Form submitted with data:', formData);
            const response = await axios.post(`${BackendRoute}/api/v1/register`, formData);
            console.log(response.data);
            if (response.data.success === true) {
                toast.success("Registration successful");
                    window.location.href=`/login?Email=${formData.email}?Department=${formData.department}`
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error(error.response.data.message,{
                theme:"dark"
            })
            // Handle error appropriately, e.g., show error message to user
        } finally {
            setIsLoading(false); // Set loading state back to false after request completes
        }
    };

    return (
        <section className='register-section'>
            <ToastContainer />
            <div className="container">
                <div className="main-container">
                    <div className="heading">
                        <h1>Sign Up</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="name same-field">
                            <input type="text" placeholder='Name' name='userName' value={formData.userName} onChange={handleChange} />
                        </div>
                        <div className="email same-field">
                            <input type="email" placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="phone same-field">
                            <input type="text" placeholder='Phone Number' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="password same-field">
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
                           
                        </div>
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        <div className="department same-field">
                            <select name='department' value={formData.department} onChange={handleChange}>
                                <option value="">Select Department</option>
                                <option value="Merchant">Merchant</option>
                                <option value="Trim Department">Trim Department</option>
                                <option value="Fabric Department">Fabric Department</option>
                                <option value="PATTERN MAKING">PATTERN MAKING</option>
                                <option value="PATTERN CUTTING">PATTERN CUTTING</option>
                                <option value="FABRIC CUTTING">FABRIC CUTTING</option>
                                <option value="SEWING">SEWING</option>
                                <option value="FINISHING">FINISHING</option>
                                <option value="QC CHECK">QC CHECK</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
