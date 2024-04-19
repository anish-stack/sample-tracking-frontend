import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Qcwork.css'; // Importing the CSS file
import { ToastContainer, toast } from 'react-toastify';

const Qcwork = () => {
  const [qcWork, setQcWork] = useState([]);
  const [filteredStyle, setFilteredStyle] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state
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
      console.log(res.data.data)
      if (res.data.data.length === 0) {
        setQcWork("No work assigned for the trim department person.");
      } else {
        setQcWork(res.data.data);
        setFilteredStyle(res.data.data);
      }
    } catch (error) {
      console.log("Trim-Person Error:", error);
    }
  };

  useEffect(() => {
    fetchDataForQc();
  }, []);

  const handleChangeStatus = async (id) => {
    // Prompt the user for a remark
    const remark = window.prompt("Please enter your remark:");

    // If the user cancels the prompt or enters an empty string, do nothing
    if (!remark) return;

    const status = {
      comment: "Completed",
      whichDepartment: user.department, // Corrected typo in department
      PersonName: trimPersonName,
      Reviews: remark // Include the remark in the status object
    };
    console.log(status)
    try {
      const response = await axios.post(`https://sample-tracking.onrender.com/api/v1/update-status-work/${id}`, {
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Work Updated");
      console.log("Updated", response);
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
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchQuery(keyword); // Update searchQuery state
    const filtered = qcWork.filter(item =>
      item.styleName.toLowerCase().includes(keyword)
    );
    setFilteredStyle(filtered);
  };

  return (
    <>
      <section className='trimDepartment-section'>
        <ToastContainer />
        <div className="container">
          <div className="heading">
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
                {Array.isArray(qcWork) && qcWork.length > 0 ? (
                  <table className="qc-table">
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
                        <th>Remark</th>
                        <th>Comment By Manager</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStyle.map((item, index) => (
                        <tr key={index}>
                          <td>{item.srfNo}</td>
                          <td>{item.styleName}</td>
                          <td>1</td>

                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "QC CHECK" && (
                                  toLocalDateString(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                          {/* <td>{toLocalDateString(item.assignDate)}</td> */}
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "QC CHECK" && (
                                  MakeEndDate(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "QC CHECK" && (
                                  CountDelayAfterEndDate(work.WorkAssignDate)
                                )}
                              </div>
                            ))}
                          </td>
                          <td>{item.numberOfPcs}</td>
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "QC CHECK" && (
                                  work.NameOfPerson
                                )}
                              </div>
                            ))}
                          </td>
                          <td>
                            {item.WorkAssigned.map((work, idx) => (
                              <div key={idx}>
                                {work.department === "QC CHECK" && (
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
                                {work.department === "QC CHECK" && (
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
                  <div className="qc-message">{qcWork}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Qcwork;
