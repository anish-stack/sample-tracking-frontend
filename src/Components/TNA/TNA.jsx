import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TNA.css';

function TNA() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const user = sessionStorage.getItem('user');
    const ParseUser = JSON.parse(user);
    const [remarks, setRemark] = useState([])
    const [Others, setOthers] = useState([])


    const fetchData = async () => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-All-styles`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const filteredTasks = res.data.data.filter(item => item._id === id);


            console.log(filteredTasks);
            setOthers(filteredTasks)
            // console.log(MapFill)
            const WorkAssinedFillter = filteredTasks.map((fillter) => fillter.WorkAssigned);
            const Remark = filteredTasks.flatMap((fillter) => fillter.remark);            // setRemark(fillterRemark)
            console.log(Remark)
            setRemark(Remark)
            setTasks(WorkAssinedFillter);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        const endDate = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        return endDate.toLocaleDateString();
    }

    const renderMerchandisingTable = () => {
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
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>

                    </table>

                </div>

                <div className="tna-py-2 tna-mt-3 tna-row">
                    {remarks.some(item => item.WhichDepartment === 'Trim Department') && (
                        <div className="tna-col-md-6">
                            <div className="tna-card">
                                <div className="tna-card-body">
                                    <h5 className="tna-card-title">Trim Department</h5>
                                    {remarks.map((items, index) => (
                                        <div key={index} className="tna-card-item">
                                            <p className="tna-mb-1">Department: {items.WhichDepartment}</p>
                                            <p className="tna-mb-1">Name of Person: {items.NameOfPerson}</p>
                                            <p className="tna-mb-0">Remark: {items.remark}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {remarks.some(item => item.WhichDepartment === 'Trim Department') && Others.length > 0 && (
                        <div className="tna-col-md-6">
                            <div className="tna-card">
                                <div className="tna-card-body">
                                    <h5 className="tna-card-title">Others</h5>
                                    {Others.map((other, index) => (
                                        <div key={index} className="tna-card-item">
                                            <p className="tna-mb-1">Assign Date: {toLocalDateString(other.assignDate)}</p>
                                            <p className="tna-mb-0">Delay: {CountDelayAfterEndDate(other.assignDate)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Fabric Department */}
                <div className="tna-py-2 tna-mt-3 tna-row">
                    {remarks.some(item => item.WhichDepartment === 'Fabric Department') && (
                        <div className="tna-col-md-6">
                            <div className="tna-card">
                                <div className="tna-card-body">
                                    <h5 className="tna-card-title">Fabric Department</h5>
                                    {remarks.map((items, index) => (
                                        <div key={index} className="tna-card-item">
                                            <p className="tna-mb-1">Department: {items.WhichDepartment}</p>
                                            <p className="tna-mb-1">Name of Person: {items.NameOfPerson}</p>
                                            <p className="tna-mb-0">Remark: {items.remark}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {remarks.some(item => item.WhichDepartment === 'Fabric Department') && Others.length > 0 && (
                        <div className="tna-col-md-6">
                            <div className="tna-card">
                                <div className="tna-card-body">
                                    <h5 className="tna-card-title">Others</h5>
                                    {Others.map((other, index) => (
                                        <div key={index} className="tna-card-item">
                                            <p className="tna-mb-1">Assign Date: {toLocalDateString(other.assignDate)}</p>
                                            <p className="tna-mb-0">Delay: {CountDelayAfterEndDate(other.assignDate)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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
                            {ParseUser.department.toUpperCase() === "MERCHANT" ? renderMerchandisingTable() : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TNA;
