import React, { useEffect, useState } from 'react';
import './ExistingStyle.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExistingStyle() {
    const [style, setStyle] = useState([]);
    const [filteredStyle, setFilteredStyle] = useState([]);
    const [selectedBuyer, setSelectedBuyer] = useState('');    const [selectedStyle, setSelectedStyle] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const token = sessionStorage.getItem('token');
    const Users = sessionStorage.getItem('user');
    const User = JSON.parse(Users);

    if (User.department !== 'Merchant') {
        alert('You do not have access to manage styles.');
        window.location.href = '/';
    }

    const fetchData = async () => {
        try {
            const res = await axios.get('https://sample-tracking.onrender.com/api/v1/get-All-styles', {
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

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const filtered = style.filter(item => {
            // Filter by buyer
            if (selectedBuyer && item.buyers !== selectedBuyer) {
                return false;
            }
            // Filter by style name
            if (searchQuery.trim() !== '' && !item.styleName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
        setFilteredStyle(filtered);
    }, [searchQuery, style, selectedBuyer]);
    const handleBuyerChange = (e) => {
        setSelectedBuyer(e.target.value);
    }
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredStyle(style);
        } else {
            const filtered = style.filter(item =>
                item.styleName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStyle(filtered);
        }
    }, [searchQuery, style]);

    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const openModal = (item) => {
        setSelectedStyle(item);
    }

    const closeModal = () => {
        setSelectedStyle(null);
    }
    function allDepartmentsPresent(workAssigned) {
        const departments = [
          "TRIM DEPARTMENT",
          "FABRIC DEPARTMENT",
          "PATTERN MAKING DEPARTMENT",
          "PATTERN CUTTING DEPARTMENT",
          "FABRIC CUTTING DEPARTMENT",
          "SEWING DEPARTMENT",
          "FINISHING DEPARTMENT",
          "QC CHECK DEPARTMENT"
        ];
      
        // Extract department names from workAssigned and convert to lowercase
        const assignedDepartmentsLowercase = workAssigned.map(item => item.department.toLowerCase());
      
        // Check if all departments exist in assignedDepartmentsLowercase (ignoring case)
        return departments.every(department => assignedDepartmentsLowercase.includes(department.toLowerCase()));
      }
      

    return (
        <section className='existingStyle-section'>
            <div className="container">
                <div className="heading extra">
                    <span>Existing Style</span>
                    <input
                        type="text"
                        placeholder="Search by Style Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select value={selectedBuyer} onChange={handleBuyerChange}>
                        <option value="">All Buyers</option>
                        <option value="Primark">Primark</option>
                        <option value="George">George</option>
                        <option value="Nutmeg">Nutmeg</option>
                        <option value="Next">Next</option>
                        <option value="Pourmoi">Pourmoi</option>
                        <option value="Lipsy">Lipsy</option>
                        <option value="Mango">Mango</option>
                        <option value="Asos">Asos</option>
                        <option value="Noon">Noon</option>
                        <option value="Brownie">Brownie</option>
                    </select>
                </div>
               
                <div className="main-detail">
                    <div className="table-parent">
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SRF No.</th>
                                        <th>Style Name</th>
                                        <th>No. of Pcs</th>
                                        <th>Sample Type</th>
                                        <th>Assign Start Date</th>
                                        <th>Assign End Date</th>
                                        <th>TNA</th>
                                        <th>Final Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStyle.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.srfNo}</td>
                                            <td>{item.styleName}</td>
                                            <td>{item.numberOfPcs}</td>
                                            <td>{item.sampleType}</td>
                                            <td>{toLocalDateString(item.assignDate)}</td>
                                            <td>{toLocalDateString(item.endDate)}</td>
                                            <td><Link to={`/tna/${item._id}`}>TNA</Link></td>
                                            <td>
                                                {item.WorkAssigned.length === 1 ? (
                                                    <ul>
                                                        <li>PersonName: {item.WorkAssigned[0].NameOfPerson}</li>
                                                        <li>Department: {item.WorkAssigned[0].department}</li>
                                                        <li>Comment: {item.WorkAssigned[0].stauts}</li>
                                                        <li>Date: {toLocalDateString(item.WorkAssigned[0].stautsDate)}</li>
                                                    </ul>
                                                ) : (
                                                    // Check if all departments are present
                                                    allDepartmentsPresent(item.WorkAssigned) ? (
                                                        // If all departments are present, show View All button
                                                        <>
                                                          <span>Work Done</span>
                                                        <button onClick={() => openModal(item)}>View All</button>
                                                        </>
                                                    ) : (
                                                        // If any department is missing, indicate incomplete work
                                                        <span>Work Incomplete</span>
                                                    )
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

            {/* Modal */}
            {selectedStyle && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>All Final Status</h2>
                        {selectedStyle.WorkAssigned.map((statusItem, index) => (
                            <ul key={index}>
                                <li>PersonName: {statusItem.NameOfPerson}</li>
                                <li>Department: {statusItem.department}</li>
                                <li>Comment: {statusItem.stauts}</li>
                                <li>Date: {toLocalDateString(statusItem.stautsDate)}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ExistingStyle;
