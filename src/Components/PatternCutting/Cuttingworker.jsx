import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CuttingWorker = () => {
    const [cuttingWorker, setCuttingWorker] = useState([]);
    const [filteredStyle, setFilteredStyle] = useState([]);
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const trimPersonName = user.userName;

    const fetchDataForCutting = async () => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/qc/${trimPersonName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.data.length === 0) {
                setCuttingWorker("No work assigned for the cutting department person.");
            } else {
                setCuttingWorker(res.data.data);
                setFilteredStyle(res.data.data);
            }
        } catch (error) {
            console.log("Cutting Worker Error:", error);
        }
    };

    useEffect(() => {
        fetchDataForCutting();
    }, []);

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
            fetchDataForCutting();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = cuttingWorker.filter(item =>
            item.styleName.toLowerCase().includes(keyword)
        );
        setFilteredStyle(filtered);
    };
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
    

    return (
        <>
            <section className='trimDepartment-section'>
                <div className="container">
                    <div className="heading">
                        {/* <span>Pattern Cutting</span> */}
                        <input type="text" placeholder="Search by Style Name" onChange={handleSearch} />
                    </div>
                    <div className="main-detail">
                        <div className="table-parent">
                            <div className="table-wrapper">
                                {Array.isArray(cuttingWorker) && cuttingWorker.length > 0 ? (
                                    <table className="cuttingWorker-table">
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
                                            {filteredStyle.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.srfNo}</td>
                                                    <td>{item.styleName}</td>
                                                    <td>{item.days || "1"}</td>
                                                    <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "PATTERN CUTTING" && (
                                  toLocalDateString(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                          {/* <td>{toLocalDateString(item.assignDate)}</td> */}
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "PATTERN CUTTING" && (
                                  MakeEndDate(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "PATTERN CUTTING" && (
                                  CountDelayAfterEndDate(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                                                    <td>{item.numberOfPcs}</td>
                                                    <td>
                                                        {item.WorkAssigned.map((work, idx) => (
                                                            <div key={idx}>
                                                                {work.department === "PATTERN CUTTING" && (
                                                                    work.NameOfPerson
                                                                )}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        {item.WorkAssigned.map((work, idx) => (
                                                            <div key={idx}>
                                                                {work.department === "PATTERN CUTTING" && (
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
                                                                {work.department === "PATTERN CUTTING" && (
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
                                    <div className="cuttingWorker-message">{cuttingWorker}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="cuttingWorker-table">
                <ToastContainer />
                <input type="text" placeholder="Search by Style Name" onChange={handleSearch} />
                {Array.isArray(cuttingWorker) && cuttingWorker.length > 0 ? (
                    <table className="cuttingWorker-table">
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
                            {filteredStyle.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.srfNo}</td>
                                    <td>{item.styleName}</td>
                                    <td>{item.days || "2"}</td>
                                    <td>{item.assignDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.numberOfPcs}</td>
                                    <td>
                                        {item.WorkAssigned.map((work, idx) => (
                                            <div key={idx}>
                                                {work.department === "PATTERN CUTTING" && (
                                                    work.NameOfPerson
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {item.WorkAssigned.map((work, idx) => (
                                            <div key={idx}>
                                                {work.department === "PATTERN CUTTING" && (
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
                                                {work.department === "PATTERN CUTTING" && (
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
                    <div className="cuttingWorker-message">{cuttingWorker}</div>
                )}
            </div> */}
        </>
    );
};

export default CuttingWorker;
