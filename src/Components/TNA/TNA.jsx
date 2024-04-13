import React, { useEffect, useState } from 'react'
import './TNA.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TNA() {
const {id} = useParams()
const [filterdata,setFilterdata] = useState([])
console.log(id)
const handleAddRemark = async () => {
    const remark = prompt("Write your remark:");
    if (remark !== null) {
        console.log("Remark:", remark);
        try {
            const res = await axios.post(`https://sample-tracking.onrender.com/api/v1/remark/${id}`, { remark }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            console.log("Remark added successfully:", res.data);
            // Optionally, you can update your UI here with the newly added remark
        } catch (error) {
            console.error("Error adding remark:", error);
            // Handle error here
        }
    }
};

const fetchData = async () => {
    try {
        const res = await axios.get('https://sample-tracking.onrender.com/api/v1/get-All-styles', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        const filterData = res.data.data.filter((item)=> item._id === id)
        console.log("filterData", filterData);
        setFilterdata(filterData)
    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
    fetchData()
},[])

    const Users = sessionStorage.getItem('user');
    const User = JSON.parse(Users);
    
    const departmentsToShow = [
        { name: "Trim Department", show: User.department === "Trim Department" || User.department === "Merchant" },
        { name: "Fabric Department", show: User.department === "Fabric Department" || User.department === "Merchant" },
        { name: "PATTERN MAKING", show: User.department === "PATTERN MAKING" || User.department === "Merchant" },
        { name: "PATTERN CUTTING", show: User.department === "PATTERN CUTTING" || User.department === "Merchant" },
        { name: "FABRIC CUTTING", show: User.department === "FABRIC CUTTING" || User.department === "Merchant" },
        { name: "SEWING", show: User.department === "SEWING" || User.department === "Merchant" },
        { name: "FINISHING", show: User.department === "FINISHING" || User.department === "Merchant" },
        { name: "QC CHECK", show: User.department === "QC CHECK" || User.department === "Merchant" }
    ];


    return (
        <section className='tna-section'>
            <div className="container">
                <div className="heading">
                    <span>TNA</span>
                </div>
                <div className="main-detail">
                    <div className="table-parent">
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentsToShow.map((department, index) => (
                                        department.show && (
                                            <tr key={index}>
                                                <td>{department.name}</td>
                                               
                                                <td><button onClick={() => handleAddRemark()}>Add Remark</button></td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TNA
