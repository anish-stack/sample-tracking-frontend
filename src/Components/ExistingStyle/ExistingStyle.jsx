import React, { useEffect, useState } from 'react';
import './ExistingStyle.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
function ExistingStyle() {
    const [style, setStyle] = useState([])
    const token = sessionStorage.getItem('token')
    const Users =sessionStorage.getItem('user')
    const User = JSON.parse(Users)
    if (User.department !== "Merchant") {
        alert("You do not have access to manage styles.");
        window.location.href = "/";
    }
    
    const fetchData = async () => {
        try {
            const res = await axios.get('https://sample-tracking.onrender.com/api/v1/get-All-styles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data.data);
            setStyle(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    function toLocalDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    return (
        <section className='existingStyle-section'>
            <div className="container">
                <div className="heading">
                    <span>Existing Style</span>
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
                                        {/* <th>Sourcing</th> */}
                                        <th>Final Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {style && style.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.srfNo}</td>
                                            <td>{item.styleName}</td>
                                            <td>{item.numberOfPcs}</td>
                                            <td>{item.sampleType}</td>
                                            <td>{toLocalDateString(item.assignDate)}</td>
                                            <td>{toLocalDateString(item.endDate)}</td>

                                            <td><Link to={`/tna/:${item._id}`}>TNA</Link></td>
                                            
                                            <td>{item.status}</td>
                                        </tr>
                                    ))

                                    }
                                    {/* <tr>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td><Link to={'/tna'}>TNA</Link></td>
                                <td>Fabric</td>
                                <td>Demo</td>
                            </tr>
                            <tr>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td><Link to={'/tna'}>TNA</Link></td>
                                <td>trim</td>
                                <td>Demo</td>
                            </tr>
                            <tr>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td>Demo</td>
                                <td><Link to={'/tna'}>TNA</Link></td>
                                <td>Trim Departement</td>
                                <td>Demo</td>
                            </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExistingStyle;
