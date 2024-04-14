import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const PatternWorkByPerson = () => {
    const [patternWorkByPerson, setPatternWorkByPerson] = useState([]);
    const [filteredPatternWork, setFilteredPatternWork] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const token = sessionStorage.getItem('token');
    const users = sessionStorage.getItem('user');
    const user = JSON.parse(users);
    const trimPersonName = user.userName;

    const fetchDataForQc = async () => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/qc/${trimPersonName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.data.length === 0) {
                setPatternWorkByPerson("No work assigned for the trim department person.");
            } else {
                setPatternWorkByPerson(res.data.data);
                setFilteredPatternWork(res.data.data);
            }
        } catch (error) {
            console.log("Trim-Person Error:", error);
        }
    };

    useEffect(() => {
        fetchDataForQc();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPatternWork(patternWorkByPerson);
        } else {
            const filtered = patternWorkByPerson.filter(item =>
                item.styleName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPatternWork(filtered);
        }
    }, [searchQuery, patternWorkByPerson]);

    const handleChangeStatus = async (id) => {
        const remark = window.prompt("Please enter your remark:");
        if (!remark) return;
        const status = {
            comment: "Completed",
            whichDepartment: user.department,
            PersonName: trimPersonName,
            Reviews: remark
        };
        try {
            const response = await axios.post(`https://sample-tracking.onrender.com/api/v1/update-status-work/${id}`, {
                status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Work Updated");
            fetchDataForQc();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pattern-work-by-person-container">
            <ToastContainer />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Style Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {Array.isArray(filteredPatternWork) && filteredPatternWork.length > 0 ? (
                <table className="pattern-work-table">
                    <thead>
                        <tr>
                            <th>SRF No.</th>
                            <th>Style Name</th>
                            <th>Days</th>
                            <th>Task Started Date</th>
                            <th>Task Ended Date</th>
                            <th>Total Quantity</th>
                            <th>Work Assigned To</th>
                            <th>Status</th>
                            <th>Comment By Manager</th>
                            <th>Remark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatternWork.map((item, index) => (
                            <tr key={index}>
                                <td>{item.srfNo}</td>
                                <td>{item.styleName}</td>
                                <td>{item.days}</td>
                                <td>{item.assignDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.numberOfPcs}</td>
                                <td>
                                    {item.WorkAssigned.map((work, idx) => (
                                        <div key={idx}>
                                            {work.department === "PATTERN MAKING" && (
                                                work.NameOfPerson
                                            )}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.WorkAssigned.map((work, idx) => (
                                        <div key={idx}>
                                            {work.department === "PATTERN MAKING" && (
                                                work.stauts
                                            )}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.WorkAssigned.map((work, idx) => (
                                        <div key={idx}>
                                            {work.Comment}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.WorkAssigned.map((work, idx) => (
                                        <div key={idx}>
                                            {work.department === "PATTERN MAKING" && (
                                                work.Reviews || "No Remark"
                                            )}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.WorkAssigned.map((works, idxz) => (
                                        <button className='btn' onClick={() => handleChangeStatus(works._id)}>Mark complete work</button>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="qc-message">{patternWorkByPerson}</div>
            )}
        </div>
    );
};

export default PatternWorkByPerson;
