import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FiberDepartment() {
    const [style, setStyle] = useState([]);
    const [filteredStyle, setFilteredStyle] = useState([]);
    const [work, setNoWork] = useState('');

    const token = sessionStorage.getItem('token');
    const Users = sessionStorage.getItem('user');
    const User = JSON.parse(Users);
    const trimPersonName = User.userName;

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8010/api/v1/get-All-styles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStyle(res.data.data);
            setFilteredStyle(res.data.data);
            console.log(filteredStyle)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataForTrim = async () => {
        try {
            const res = await axios.get(`http://localhost:8010/api/v1/fabric/${trimPersonName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.data.length === 0) {
                setNoWork("No work assigned for the trim department person.");
            } else {
                setStyle(res.data.data);
                setFilteredStyle(res.data.data);
            }
        } catch (error) {
            console.log("Trime-Person", error);
        }
    }

    useEffect(() => {
        if (User.department === "Fabric Department") {
            fetchDataForTrim();
        } else if (User.department === "Merchant") {
            fetchData();
        }
    }, []);
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
    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = style.filter(item =>
            item.styleName.toLowerCase().includes(keyword)
        );
        setFilteredStyle(filtered);
    }


    return (
        <section className='trimDepartment-section'>
            <div className="container">
                <div className="heading">
                    <span>Fabric  Department</span>
                </div>
                <div className="main-detail">
                    <div className="table-parent">
                        <div className="table-wrapper">
                        <input type="text" placeholder="Search by Style Name" onChange={handleSearch} />

                            <table>
                                <thead>
                                    <tr>
                                        <th>SRF No.</th>
                                        <th>Style Name</th>
                                        {/* <th>Colour</th> */}
                                        <th>Days</th>
                                        <th>Task Start Date</th>
                                        <th>Task End Date</th>
                                        <th>Descriptions</th>


                                        <th>Delay</th>

                                        <th>Total Quantity</th>
                                        <th>tna</th>
                                        <th>Status</th>
                                        <th>Remark</th>
                                        <th>Change Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStyle && filteredStyle.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.srfNo}</td>
                                            <td>{item.styleName}</td>
                                            {/* <td>{item.color[0]}</td> */}
                                            <td>2</td>
                                            <td>{toLocalDateString(item.assignDate)}</td>
                                            <td>{toLocalDateString(item.endDate)}</td>
                                            <td>{item.fabricDepartmentMsg || 'N.A'}</td>
                                            <td className={calculateDelayClass(item.assignDate, item.endDate)}>{calculateDelayDays(item.assignDate, item.endDate)}</td>


                                            <td>{item.numberOfPcs}</td>



                                            <td><Link className='tna' to={`/tna/${item._id}`}>TNA</Link></td>
                                            <td>
                                                {item.status && item.status.length > 0 ? (
                                                    <ul>
                                                        {item.status.map((status, index) => {
                                                            if (status.whichDepartemt === 'fabric') {
                                                                return (
                                                                    <li key={index}>
                                                                        <p>Department: {status.whichDepartemt}</p>
                                                                        <p>Name: {status.PersonName}</p>
                                                                        <p>Remark: {status.comment}</p>
                                                                        {index !== item.status.length - 1 && <hr />}
                                                                    </li>
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </ul>
                                                ) : (
                                                    "No Updated"
                                                )}
                                            </td>

                                            <td>
                                                {item.remark && item.remark.length > 0 ? (
                                                    <ul>
                                                        {item.remark
                                                            .filter(remark => remark.WhichDepartment === "Fabric Department")
                                                            .map((remark, index) => (
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

export default FiberDepartment
