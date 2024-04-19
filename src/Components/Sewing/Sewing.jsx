import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Qc = () => {
    const token = sessionStorage.getItem('token')
    const Users = sessionStorage.getItem('user')
    const User = JSON.parse(Users)
    const trimPersonName = User.userName
    const [searchQuery, setSearchQuery] = useState('');

    const [style, setStyle] = useState([])
    const [work, setNoWork] = useState()
    const fetchData = async () => {
        try {
            const res = await axios.get('https://sample-tracking.onrender.com/api/v1/get-All-styles', {
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
    useEffect(() => {
        fetchData()
    }, [])
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredStyle = style.filter((item) =>
        item.styleName.toLowerCase().includes(searchQuery)
    );
    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    function MakeEndDate(assignDate) {
        const date = new Date(assignDate);
        const endDate = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000); // Adding two days worth of milliseconds
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
        return 0; 
    }
    
    return (
        <>
            {User.department === "SEWING" && User.userName.includes("Manager") ? (
                <section className='trimDepartment-section'>
                    
                    <div className="container">
                        <div className="heading">
                            <span>SEWING-DEPARTMENT (Head) </span>
                            <input
                        type="text"
                        placeholder="Search by Style Name"
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                        </div>
                        <div className="main-detail">
                            <div className="table-parent">
                                <div className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>SRF No.</th>
                                                <th>Style Name</th>
                                                <th>Days</th>
                                                <th>Task Start Date</th>
                                                <th>Task End Date</th>
                                                <th>Delay</th>
                                                <th>Total Quantity</th>
                                                <th>Action By Worker</th>
                                                <th>Work Assigned To</th>
                                                <th>Assign Work</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStyle && filteredStyle.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.srfNo}</td>
                                                    <td>{item.styleName}</td>
                                                    <td>2</td>
                                                    <td>{toLocalDateString(item.assignDate)}</td>
                                                    <td>{MakeEndDate(item.assignDate)}</td>
                                                    <td>{CountDelayAfterEndDate(item.assignDate)}</td>
                                                    < td>{item.numberOfPcs}</td>
                                                    <td>
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 ? (
                                                            <ul>
                                                                {item.WorkAssigned.map((Pattern, index) => {
                                                                    if (Pattern.department === 'SEWING') {
                                                                        return (
                                                                            <li key={index}>

                                                                                <p>Name: {Pattern.NameOfPerson}</p>
                                                                                <p>Remark: {Pattern.Reviews || "No Update"}</p>
                                                                                <p>Status: {Pattern.stauts || "Pending"}</p>

                                                                                {index !== item.WorkAssigned.length - 1 && <hr />}
                                                                            </li>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })}
                                                            </ul>
                                                        ) : (
                                                            "Work Not Assigned"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 ? (
                                                            <ul>
                                                                {item.WorkAssigned.map((Pattern, index) => {
                                                                    if (Pattern.department === 'SEWING') {
                                                                        return (
                                                                            <li key={index}>
                                                                                <p>Department: {Pattern.department}</p>
                                                                                <p>Name: {Pattern.NameOfPerson}</p>
                                                                                <p>Remark: {Pattern.Comment}</p>
                                                                                {index !== item.WorkAssigned.length - 1 && <hr />}
                                                                            </li>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })}
                                                            </ul>
                                                        ) : (
                                                            "Work Not Assigned"
                                                        )}
                                                    </td>


                                                    {/* <td>
                                                    {item.remark && item.remark.length > 0 ? (
                                                        <ul>
                                                            {item.remark
                                                                .filter(remark => remark.WhichDepartment === "SEWING")
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
                                                </td> */}
                                                    <td>
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 && item.WorkAssigned.some(workItem => workItem.department === "SEWING") ? (
                                                            "Already Assigned"
                                                        ) : (
                                                            <Link className='btn-cta' to={`/Assign/${item._id}`}>Work Assign</Link>
                                                        )}
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className='ceen'>You Have No Rights To Access This
                    {User.department === "SEWING" ? (
                        window.location.href = "/sewing-work"
                    ) : null}
                </div>
            )}
        </>

    )
}

export default Qc