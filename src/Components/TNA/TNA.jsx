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
            const WorkAssinedFillter = filteredTasks.map((fillter) => fillter.WorkAssigned)
            console.log(WorkAssinedFillter)

            setTasks(WorkAssinedFillter);
            // console.log("first", filteredTasks)
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

    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function MakeEndDate(assignDate) {
        const date = new Date(assignDate);
        const endDate = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000); // Adding two days worth of milliseconds
        return endDate.toLocaleDateString();
    }
    function CountDelayAfterEndDate(assignDate) {
        const Endate = MakeEndDate(assignDate);
        console.log("End Date:", Endate);

        const TodayDate = new Date();
        console.log("Today's Date:", TodayDate);

        // Convert both dates to UTC to ensure consistent comparison
        const utcEndDate = new Date(Endate);
        const utcTodayDate = new Date(TodayDate.toUTCString());

        if (utcTodayDate.getTime() >= utcEndDate.getTime()) {
            // Calculate delay after EndDate and return delay days
            const delayMilliseconds = utcTodayDate.getTime() - utcEndDate.getTime();
            const delayDays = Math.floor(delayMilliseconds / (1000 * 60 * 60 * 24));
            console.log("Delay Days:", delayDays);
            return delayDays;
        }
        return 0; // Return 0 if today's date is not greater than or equal to end date
    }
    const renderTable = () => {
        const departments = [
            "FABRIC DEPARTMENT",
            "PATTERN MAKING DEPARTMENT",
            "PATTERN CUTTING DEPARTMENT",
            "FABRIC CUTTING DEPARTMENT",
            "SEWING DEPARTMENT",
            "FINISHING DEPARTMENT",
            "QC CHECK DEPARTMENT"
        ];
        return (
            <div>
                <h2>{ParseUser.department}</h2>
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
        const departments = [
            "FABRIC DEPARTMENT",
            "PATTERN MAKING DEPARTMENT",
            "PATTERN CUTTING DEPARTMENT",
            "FABRIC CUTTING DEPARTMENT",
            "SEWING DEPARTMENT",
            "FINISHING DEPARTMENT",
            "QC CHECK DEPARTMENT"
        ];
        return (
            <div>
                <h2>Merchandising</h2>
                <div className="allDepartments">
                    <table>
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Name of Person</th>
                                <th>Work Assign Date</th>
                                <th>Delay</th>
                                <th>Comment</th>
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((departmentTasks, index) => (
                                <React.Fragment key={index}>
                                    {departmentTasks.map((task, taskIndex) => (
                                        <tr key={taskIndex}>
                                            <td>{task.department}</td>
                                            <td>{task.NameOfPerson}</td>
                                            <td>{toLocalDateString(task.WorkAssignDate)}</td>
                                            <td>{CountDelayAfterEndDate(task.WorkAssignDate)}</td>
                                            <td className={task.department === "QC CHECK" ? "approved" : ""}>
                                                {task.department === "QC CHECK" ? "Approved" : task.Comment}
                                            </td>

                                            {/* Add more table cells for additional task details */}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
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
