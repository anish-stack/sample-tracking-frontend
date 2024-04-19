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
            console.log(res.data)
            if (res.data.data.length === 0) {
                setPatternWorkByPerson("No work assigned for the trim department person.");
            } else {
                setPatternWorkByPerson(res.data.data);
                setFilteredPatternWork(res.data.data);
                console.log(filteredPatternWork)
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
        // console.log("End Date:", Endate);

        const TodayDate = new Date();
        // console.log("Today's Date:", TodayDate);

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




    return (
        <>

            <section className='trimDepartment-section'>
                <ToastContainer />
                <div className="container">
                    <div className="heading">
                        <span></span>
                        <input
                            type="text"
                            placeholder="Search by Style Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="main-detail">
                        <div className="table-parent">
                            <div className="table-wrapper">
                                {Array.isArray(filteredPatternWork) && filteredPatternWork.length > 0 ? (
                                    <table className="pattern-work-table">
                                        <thead>
                                            <tr>
                                                <th>SRF No.</th>
                                                <th>Style Name</th>
                                                <th>Days</th>
                                                <th>Task Start Date</th>
                                                <th>Task End Date</th>
                                                <th>Delay</th>
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
                                                    <td>{item.days || "2"}</td>
                                                    <td>
                                                        {item.WorkAssigned.map((work, idx) => (
                                                            <div key={idx}>
                                                                {work.department === "PATTERN MAKING" && (
                                                                    toLocalDateString(work.WorkAssignDate)
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    {/* <td>{toLocalDateString(item.assignDate)}</td> */}
                                                    <td>
                                                        {item.WorkAssigned.map((work, idx) => (
                                                            <div key={idx}>
                                                                {work.department === "PATTERN MAKING" && (
                                                                    MakeEndDate(work.WorkAssignDate)
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        {item.WorkAssigned.map((work, idx) => (
                                                            <div key={idx}>
                                                                {work.department === "PATTERN MAKING" && (
                                                                    CountDelayAfterEndDate(work.WorkAssignDate)
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
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
                        </div>
                    </div>

                </div>

            </section>

            {/* <div className="pattern-work-by-person-container">
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
                                <th>Task Start Date</th>
                                <th>Task End Date</th>
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
            </div> */}
        </>
    );
};

export default PatternWorkByPerson;
