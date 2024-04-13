import React, { useEffect, useState } from 'react';
import './AddNewStyle.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function AddNewStyle() {
    const [trimNames, setTrimNames] = useState([]);
    const token = sessionStorage.getItem('token')
    const Users =sessionStorage.getItem('user')
    const User = JSON.parse(Users)
    if (User.department !== "Merchant") {
        alert("You do not have access to manage styles.");
        window.location.href = "/";
    }
    const [formData, setFormData] = useState({
        styleName: '',
        srfNo: '',
        numberOfPcs: '',
        assignStartDate: '',
        endDate: '',
        sampleType: '',
        trimSource: '',
        color: '',
        TrimeDepartmentPersonName: '',
        trimDepartmentMsg: '',
        fabricSource: '',
        fabricDepartmentMsg: '',
        FabricDepartmentPersonName: '',
        buyers: ''
    });
    const [Fabricperson,setFabricNames] = useState([])
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'trimSource' && value === 'true') {
            try {
                await getNameOftrimePersen("Trim Department");
                ; // Assuming 'department' is available in formData
            } catch (error) {
                console.error('Error fetching trim department person:', error);
            }
        }
        if(name === 'fabricSource' && value =='true' ){
            try {
                await getNameOFabricPersen("Fabric Department");
            } catch (error) {
                console.error('Error fetching Fabric department person:', error);
            }
           
        }
    };


    const getNameOftrimePersen = async (Department) => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-user-by-department/${Department}`)
            console.log(res.data.data)
            setTrimNames(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getNameOFabricPersen = async (Department) => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-user-by-department/${Department}`)
            console.log(res.data.data)
            setFabricNames(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        // Replace 'YOUR_BACKEND_URL' with the actual backend URL
        const backendURL = 'https://sample-tracking.onrender.com/api/v1/create-style';
        try {
            const token = sessionStorage.getItem('token'); // Assuming you store the token in sessionStorage
            const response = await axios.post(backendURL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success("New Style Added Successfull");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <section className='addnewstyle-section'>
            <ToastContainer/>
            <div className="container">
                <div className="main-detail">
                    <div className="heading">
                        <span>Add New Style</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="styleName same-field">
                            <input type="text" name="styleName" placeholder='Style Name' value={formData.styleName} onChange={handleChange} />
                        </div>
                        <div className="srf-no same-field">
                            <input type="text" name="srfNo" placeholder='SRF No.' value={formData.srfNo} onChange={handleChange} />
                            <input type="text" name="numberOfPcs" placeholder='No. Of Pcs' value={formData.numberOfPcs} onChange={handleChange} />
                        </div>
                        <div className="startend-date same-field">
                           <div className='flex '>
                           <label htmlFor="assignStartDate">Assign Start Date</label>
                            <input type="date" name="assignStartDate" placeholder='Assign Start Date' value={formData.assignStartDate} onChange={handleChange} />
                           </div>
                          <div className='flex'>
                          <label htmlFor="assignStartDate">Assign End Date</label>
                            <input type="date" name="endDate" placeholder='Assign End Date' value={formData.endDate} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="color same-field">
                            <input type="text" name="sampleType" placeholder='Sample Type' value={formData.sampleType} onChange={handleChange} />
                            <input type="text" name="color" placeholder='Color' value={formData.color} onChange={handleChange} />
                        </div>

                        <div className="sample-type same-field">
                            <select name="trimSource" value={formData.trimSource} onChange={handleChange}>
                                <option value="">Select Trim Source</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        {formData.trimSource === 'true' && (
                            <div className="trim-department same-field">
                                <select name="TrimeDepartmentPersonName" value={formData.TrimeDepartmentPersonName} onChange={handleChange}>
                                    <option value="">Select Trim Department Person</option>
                                    {trimNames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                                <textarea name="trimDepartmentMsg" placeholder='Trim Department Message' className='msg' value={formData.trimDepartmentMsg} onChange={handleChange}></textarea>
                            </div>
                        )}
                        <div className="sample-type same-field">
                            <input type="text" name="sampleType" placeholder='Sample Type' value={formData.sampleType} onChange={handleChange} />
                            <select name="fabricSource" value={formData.fabricSource} onChange={handleChange}>
                                <option value="">Select Fabric Source</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        {formData.fabricSource === 'true' && (
                            <div className="fabric-department same-field">
                                <select name="FabricDepartmentPersonName" value={formData.FabricDepartmentPersonName} onChange={handleChange}>
                                    <option value="">Select Fabric Department Person</option>
                                    {Fabricperson.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                                <textarea name="fabricDepartmentMsg" placeholder='Fabric Department Message' className='msg' value={formData.fabricDepartmentMsg} onChange={handleChange}></textarea>
                            </div>
                        )}
                        <div className="buyer same-field">
                            <select name="buyers" value={formData.buyers} onChange={handleChange}>
                                <option value="">Select Buyer</option>
                                <option value="Primark">Primark</option>
                                <option value="George">George</option>
                                <option value="Nutmag">Nutmag</option>
                                <option value="Next">Next</option>
                                <option value="Pourmoi">Pourmoi</option>
                                <option value="Lipsy">Lipsy</option>
                                <option value="Mango">Mango</option>
                                <option value="Asos">Asos</option>
                                <option value="Noon">Noon</option>
                                <option value="Brownie">Brownie</option>
                                {/* Add other buyer options */}
                            </select>
                        </div>
                        <button type='submit'>Add Style</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddNewStyle;
