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
          const res = await axios.get(`http://localhost:8010/api/v1/qc/${trimPersonName}`, {
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
            const response = await axios.post(`http://localhost:8010/api/v1/update-status-work/${id}`, {
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

    return (
        <div className="cuttingWorker-table">
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
        </div>
    );
};

export default CuttingWorker;
