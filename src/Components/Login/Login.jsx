import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const BackendRoute = "https://sample-tracking.onrender.com";

    // Define state variables for form fields and loading state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        department: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
        console.log('Form submitted with data:', formData);
        try {
            const response = await axios.post(`${BackendRoute}/api/v1/login`, formData);
            console.log(response.data);
            sessionStorage.setItem("user",JSON.stringify(response.data.data))
            sessionStorage.setItem("token",response.data.token)
            window.location.href="/"
            // Handle successful login, e.g., redirect to dashboard
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error(error.response.data.message,{
                theme:"dark"
            })
            // Handle error appropriately, e.g., show error message to user
        } finally {
            setIsLoading(false); // Set loading state back to false after request completes
        }
    };

    return (
        <section className='login-section'>
            <div className="container">
                <div className="main-container">
                    <div className="heading">
                        <span>Login</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="email same-field">
                            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email Address' />
                        </div>
                        <div className="password same-field">
                            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' />
                        </div>
                        {/* Department field - Consider removing for a login form */}
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
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
