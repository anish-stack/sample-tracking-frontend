import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TNA.css';

function UserTNA() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-All-styles`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                const filteredTasks = res.data.data.filter(item => item._id === id);
                setTasks(filteredTasks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    function CountDelayAfterEndDate(assignDate) {
        const Endate = MakeEndDate(assignDate);
        const TodayDate = new Date();
        const utcEndDate = new Date(Endate);
        const utcTodayDate = new Date(TodayDate.toUTCString());

        if (utcTodayDate.getTime() >= utcEndDate.getTime()) {
            const delayMilliseconds = utcTodayDate.getTime() - utcEndDate.getTime();
            const delayDays = Math.floor(delayMilliseconds / (1000 * 60 * 60 * 24));
            return delayDays;
        }
        return 0;
    }

    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function MakeEndDate(assignDate) {
        const date = new Date(assignDate);
        const endDate = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
        return endDate.toLocaleDateString();
    }
    const handleChangeStatus = async (id) => {
        const remark = window.prompt("Please enter your remark:");
        if (!remark) return;

        const status = {
            comment: "Completed",
            whichDepartment: user.department,
            PersonName: user.userName,
            Reviews: remark
        };

        try {
            const response = await axios.post(`https://sample-tracking.onrender.com/api/v1/remark/${id}`, {
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // toast.success("Work Updated");
            console.log(response.data)
            // fetchDataForCutting();
        } catch (error) {
            console.log(error);
        }
    };
    const renderMerchandisingTable = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const task = tasks[0]; // Get the first task
        console.log(task)

        return (
            <div className="allDepartments">
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Name of Person</th>
                            <th>Days</th>
                            <th>Work Assign Date</th>
                            <th>Work End Date</th>
                            <th>Delay</th>
                            <th>Comment</th>
                            <th>Add Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Trim Department</td>
                            <td>{user.userName}</td>
                            <td>2</td>
                            <td>{toLocalDateString(task.assignDate)}</td>
                            <td>{MakeEndDate(task.assignDate)}</td>
                            <td>{CountDelayAfterEndDate(task.assignDate)}</td>
                            <td>
                                <ul>
                                    {task.remark.map((styleRemark, index) => {
                                        return ( // Add return statement here
                                            styleRemark.NameOfPerson === user.userName && styleRemark.styleId === task._id ? (
                                                <li key={index}>{styleRemark.remark || "No Update"}</li>
                                            ) : null
                                        );
                                    })}
                                </ul>
                            </td>

                            <td>  <button className='btn' onClick={() => handleChangeStatus(task._id)}>Mark complete work</button></td>
                        </tr>
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
                            {renderMerchandisingTable()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserTNA;
