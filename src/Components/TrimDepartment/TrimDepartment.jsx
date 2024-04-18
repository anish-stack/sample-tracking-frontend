import React, { useEffect, useState } from 'react'
import './TrimDepartment.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TrimDepartment() {
    const [style, setStyle] = useState([])
    const [work, setNoWork] = useState()

    const token = sessionStorage.getItem('token')
    const Users = sessionStorage.getItem('user')
    const User = JSON.parse(Users)
    const trimPersonName = User.userName

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8010/api/v1/get-All-styles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Merchenta-Person", res.data.data);
            setStyle(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataForTrim = async () => {
        try {
            const res = await axios.get(`http://localhost:8010/api/v1/trim/${trimPersonName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Trime-Person", res.data.data);
            if (res.data.data.length === 0) {
                setNoWork("No work assigned for the trim department person.")
            } else {
                setStyle(res.data.data)
            }
        } catch (error) {
            console.log("Trime-Person", error);
        }
    }

    useEffect(() => {
        if (User.department === "Trim Department") {
            fetchDataForTrim()
        } else if (User.department === "Merchant") {
            fetchData()
        }
    }, [])
    const handleAddRemark = (index) => {
        const remark = prompt("Write your remark:");
        if (remark !== null) {
            console.log("Remark:", remark);
            // Here you can send the remark to the server or perform any other action
        }
    };
    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function calculateDelayDays(assignDate, endDate) {
        const assignDateObj = new Date(assignDate);
        const endDateObj = new Date(endDate);
        const currentDate = new Date(); // Get the current date

        // If the current date is after the end date, calculate delay
        if (currentDate > endDateObj) {
            // Calculate the difference in milliseconds
            const differenceMs = currentDate - endDateObj;

            // Convert milliseconds to days
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

            return Math.max(0, differenceDays); // Return 0 if difference is negative
        } else {
            return 0; // No delay if current date is before or equal to end date
        }
    }

    function calculateDelayClass(assignDate, endDate) {
        const assignDateObj = new Date(assignDate);
        const endDateObj = new Date(endDate);

        // Calculate the difference in milliseconds
        const differenceMs = endDateObj - assignDateObj;

        // Convert milliseconds to days
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        // Define the delay thresholds and corresponding class names
        const delayClasses = {
            2: '2day',
            4: '4day'
        };

        // Find the appropriate class based on the delay
        let delayClass = '';
        for (const [threshold, className] of Object.entries(delayClasses)) {
            if (differenceDays > threshold) {
                delayClass = className;
            }
        }

        return delayClass;
    }

    const handleChangeStauts = async (id) => {
        const status = {

            comment: "Completed",
            whichDepartemt: User.department,
            PersonName: trimPersonName
        }
        try {
            const response = await axios.post(`http://localhost:8010/api/v1/update-style/${id}`, {
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Updated")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteStyle = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8010/api/v1/delete-style/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Deleted")
            fetchDataForTrim()
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='trimDepartment-section'>
            <div className="container">
                <div className="heading">
                    {/* <span>Trim Department</span> */}
                </div>
                <div className="main-detail">
                    <div className="table-parent">
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SRF No.</th>
                                        <th>Style Name</th>
                                        {/* <th>Colour</th> */}
                                        <th>Days</th>
                                        <th>Task Start Date</th>
                                        {/* <th>Task End Date</th> */}
                                        <th>Description</th>


                                        <th>Delay</th>

                                        <th>Total Quantity</th>
                                        <th>TNA</th>
                                        <th>Status</th>
                                        <th>Remark</th>
                                        <th>Change Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {style && style.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.srfNo}</td>
                                            <td>{item.styleName}</td>
                                            {/* <td>{item.color[0]}</td> */}
                                            <td>2</td>
                                            <td>{toLocalDateString(item.assignDate)}</td>
                                            {/* <td>{toLocalDateString(item.endDate)}</td> */}
                                            <td>{item.trimDepartmentMsg}</td>
                                            <td className={calculateDelayClass(item.assignDate, item.endDate)}>{calculateDelayDays(item.assignDate, item.endDate)}</td>


                                            <td>{item.numberOfPcs}</td>



                                            <td><Link className='tna' to={`/tna/${item._id}`}>TNA</Link></td>
                                            <td>
                                                {item.status && item.status.length > 0 ? (
                                                    <ul>
                                                        {item.status.map((status, index) => (
                                                            <li key={index}>
                                                                <p>Department: {status.whichDepartemt}</p>
                                                                <p>Name: {status.PersonName}</p>
                                                                <p>Remark: {status.comment}</p>
                                                                {index !== item.status.length - 1 && <hr />}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    "No Updated"
                                                )}
                                            </td>

                                            <td>
                                                {item.remark && item.remark.length > 0 ? (
                                                    <ul>
                                                        {item.remark.map((remark, index) => (
                                                            <li key={index}>
                                                                <p>Department: {remark.WhichDepartment}</p>
                                                                <p>Name: {remark.NameOfPerson}</p>
                                                                <p>Remark: {remark.remark}</p>
                                                                {index !== item.remark.length - 1 && <hr />}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    "No remarks"
                                                )}
                                            </td>
                                            {item.status === "Completed" ? null : (
                                                <td onClick={() => handleChangeStauts(item._id)}><button className='btn'>Mark complete work</button></td>
                                            )}





                                        </tr>
                                    ))}
                                </tbody>
                                {work}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrimDepartment
