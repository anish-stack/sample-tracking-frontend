import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Cutting = () => {
    const token = sessionStorage.getItem('token')
    const Users = sessionStorage.getItem('user')
    const User = JSON.parse(Users)
    const trimPersonName = User.userName


    console.log(trimPersonName)
    const [style, setStyle] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const [work, setNoWork] = useState()
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
            {User.department === "PATTERN CUTTING" && User.userName.includes("Manager") ? (
                <section className='trimDepartment-section'>
                    <input
                        type="text"
                        placeholder="Search by Style Name"
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                    <div className="container">
                        <div className="heading">
                            <span>PATTERN CUTTING-DEPARTMENT (Head) </span>
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
                                                <th>Total Quantity</th>
                                                <th>Action By Worker</th>
                                                <th>Work Assigned To</th>
                                                <th>Assign Work</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {style && style.map((item, index) => (
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
                                                                    if (Pattern.department === 'PATTERN CUTTING') {
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
                                                                    if (Pattern.department === 'PATTERN CUTTING') {
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
                                                                .filter(remark => remark.WhichDepartment === "PATTERN CUTTING")
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
                                                        {item.WorkAssigned && item.WorkAssigned.length > 0 && item.WorkAssigned.some(workItem => workItem.department === "PATTERN CUTTING") ? (
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
                    {User.department === "PATTERN CUTTING" ? (
                        window.location.href = "/pattern-cutting-worker"
                    ) : null}
                </div>
            )}
        </>

    )
}

export default Cutting