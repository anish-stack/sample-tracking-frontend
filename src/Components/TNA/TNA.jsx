import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TNA.css';

function TNA() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const user = sessionStorage.getItem('user');
    const ParseUser = JSON.parse(user);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-All-styles`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const filteredTasks = res.data.data.filter(item => item._id === id);
            setTasks(filteredTasks);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddRemark = async (index) => {
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

    function calculateDays(startDate, department) {
        const expectedDurations = {
            "TRIM DEPARTMENT": 2,
            "FABRIC DEPARTMENT": 2,
            "PATTERN MAKING DEPARTMENT": 2,
            "PATTERN CUTTING DEPARTMENT": 1,
            "FABRIC CUTTING DEPARTMENT": 1,
            "SEWING DEPARTMENT": 2,
            "FINISHING DEPARTMENT": 1,
            "QC CHECK DEPARTMENT": 1
        };
    
        const expectedDuration = parseInt(expectedDurations[department.toUpperCase()]) || 0;
        const start = new Date(startDate);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // milliseconds in a day
        const roundedDifference = Math.round(differenceInDays); // Round to nearest whole day
    
        // Adjust the difference based on the expected duration
        const adjustedDifference = Math.max(0, roundedDifference - expectedDuration);
        return adjustedDifference;
    }
    
    function calculateDelayDays(startDate, endDate, department) {
        const expectedDurations = {
            "TRIM DEPARTMENT": 2,
            "FABRIC DEPARTMENT": 2,
            "PATTERN MAKING DEPARTMENT": 2,
            "PATTERN CUTTING DEPARTMENT": 1,
            "FABRIC CUTTING DEPARTMENT": 1,
            "SEWING DEPARTMENT": 2,
            "FINISHING DEPARTMENT": 1,
            "QC CHECK DEPARTMENT": 1
        };
    
        const expectedDuration = parseInt(expectedDurations[department.toUpperCase()]) || 0;
        const actualDuration = calculateDays(startDate, endDate);
        const delayStartDate = new Date(startDate);
        delayStartDate.setDate(delayStartDate.getDate() + expectedDuration); // Adding expected duration to start date
        const delayStartDay = delayStartDate.getDate();
        const currentDay = new Date().getDate();
    
        // Calculate delay only if the current day is after the delay start day
        const delay = Math.max(0, currentDay - delayStartDay);
        return delay;
    }
    

    const renderTable = () => {
        return (
            <div>
                {/* <h2>{ParseUser.department}</h2> */}
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Style Name</th>
                            <th>Days</th>
                            <th>Task Start Date</th>
                            <th>Task End Date</th>

                            {/* <th>Task End Date</th> */}
                            <th>Delay</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{ParseUser.department}</td>
                                <td>{task.styleName}</td>
                                <td>{["Trim Department", "Fabric Department", "PATTERN MAKING", "SEWING"].includes(ParseUser.department) ? "2" : "1"}</td>
                                <td>{new Date(task.assignDate).toLocaleDateString()}</td>
                                <td>4/20/2024</td>

                                {/* <td>{new Date(task.endDate).toLocaleDateString()}</td> */}
                                <td>{calculateDelayDays(task.assignDate, task.endDate, ParseUser.department)}</td>
                                <td><button onClick={() => handleAddRemark(index)}>Add Remark</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderMerchandisingTable = () => {
        return (
            <div>
                <h2>Merchandising</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Style Name</th>
                            <th>Days</th>
                            <th>Task Start Date</th>
                            <th>Task End Date</th>
                            <th>Delay</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{ParseUser.department}</td>
                                <td>{task.styleName}</td>
                                <td>{calculateDays(task.assignDate, task.endDate)}</td>
                                <td>{new Date(task.assignDate).toLocaleDateString()}</td>
                                <td>{new Date(task.endDate).toLocaleDateString()}</td>
                                <td>{calculateDelayDays(task.assignDate, task.endDate, ParseUser.department)}</td>
                                <td><button onClick={() => handleAddRemark(index)}>Add Remark</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <section className='tna-section'>
            <div className="container">
                <div className="heading">
                    <span>TNA</span>
                </div>
                <div className="main-detail">
                    <div className="table-parent">
                        <div className="table-wrapper">
                            {ParseUser.department.toUpperCase() === "MERCHANT" ? renderMerchandisingTable() : renderTable()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TNA;
