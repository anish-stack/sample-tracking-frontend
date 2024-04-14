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
    return (
        <>
            {User.department === "QC CHECK" && User.userName.includes("Manager") ? (
                <section className='trimDepartment-section'>
                    <input
                        type="text"
                        placeholder="Search by Style Name"
                        onChange={handleSearch}
                        value={searchQuery}
                    />

                    <div className="container">
                        <div className="heading">
                            <span>QUALIITY-CHECK-DEPARTMENT (Manger) </span>
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
                                                <th>Task Started Date</th>
                                                <th>Task Ended Date</th>
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
                                                    <td>{item.assignDate}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>{item.numberOfPcs}</td>
                                                    {/* //assignworker */}
                                                    <td>
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 ? (
                                                            <ul>
                                                                {item.WorkAssigned.map((Pattern, index) => {
                                                                    if (Pattern.department === 'QC CHECK') {
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
                                                                    if (Pattern.department === 'QC CHECK') {
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
                                                                .filter(remark => remark.WhichDepartment === "QC CHECK")
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
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 && item.WorkAssigned.some(workItem => workItem.department === "QC CHECK") ? (
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
                    {User.department === "QC CHECK" ? (
                        window.location.href = "/QC-Work"
                    ) : null}
                </div>
            )}
        </>

    )
}

export default Qc