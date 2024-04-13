import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './assign.css'
import { ToastContainer, toast } from 'react-toastify';

const AssignWork = () => {
    const token = sessionStorage.getItem('token');
    const Users = sessionStorage.getItem('user');
    const User = JSON.parse(Users);
    const { id } = useParams();
    console.log(id)
    const [PatternPerson, setPatternPerson] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [comment, setComment] = useState('');

    const fetchAllPatternMakingUsers = async () => {
        try {
            const res = await axios.get(`https://sample-tracking.onrender.com/api/v1/get-user-by-department/${User.department}`);
            console.log(res.data.data);
            setPatternPerson(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllPatternMakingUsers();
    }, [id]);

    const handleAssignWork = async () => {
        const WorkAssigned = {
            department: User.department,
            NameOfPerson: selectedPerson,
            Comment: comment,
            WorkId: id,
           
            WorkGiveBy: User.userName
        };

        try {
            console.log(WorkAssigned)
            const response = await axios.post(`https://sample-tracking.onrender.com/api/v1/Assigned`, {
                WorkAssigned
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Updated");
            toast.success("Work Assigned Successfull")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="assignWork">
            <ToastContainer/>
            <label htmlFor="patternPerson">Select Pattern Making Person:</label>
            <select id="patternPerson" onChange={(e) => setSelectedPerson(e.target.value)} value={selectedPerson}>
                <option value="">Select person...</option>
                {PatternPerson.map((person, index) => (
                    <option key={index} value={person.NameOfPerson}>{person}</option>
                ))}
            </select>
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleAssignWork}>Assign Work</button>
        </div>
    );
};

export default AssignWork;
