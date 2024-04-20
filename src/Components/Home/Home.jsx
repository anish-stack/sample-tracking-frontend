import React, { useState } from 'react'
import './Home.css'
import Header from '../Header/Header'
import { Link, Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Resgister/Register'
import ExistingStyle from '../ExistingStyle/ExistingStyle'
import AddNewStyle from '../AddNewStyle/AddNewStyle'
import TNA from '../TNA/TNA'
import HomePage from '../HomePage/HomePage'
import FiberDepartment from '../FiberDepartment/FiberDepartment'
import TrimDepartment from '../TrimDepartment/TrimDepartment'

import PatterDepartment from '../Pattern/PatterDepartment'
import AssignWork from '../Pattern/AssignWork'
import Cutting from '../PatternCutting/Cutting'
import Sewing from '../Sewing/Sewing'
import PatternWorkByPerson from '../Pattern/PatternWorkByPerson'
import Finishing from '../FinishingDep/Finishing'
import Qc from '../QcCheck/QC'
import Qcwork from '../QcCheck/Qcwork'
import FinishingWork from '../FinishingDep/Finishingperson'
import SewingPerson from '../Sewing/Sweingwork'
import Cuttingworker from '../PatternCutting/Cuttingworker'
import PrimarkBuyer from '../PrimarkBuyer/PrimarkBuyer'
import FABRICUTTING from '../Fabric Cutting/FabricCutting'
import FabricCuttingWorker from '../Fabric Cutting/FabricCuttingWorker'
import UserTNA from '../TNA/UserTna'

function Home() {
    const token = sessionStorage.getItem('token')

    const [isBuyerActive, setIsBuyerActive] = useState(false)

    const [isMenuActive, setIsMenuActive] = useState(false)

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    const handleIsBuyerActive = () => {
        setIsBuyerActive(!isBuyerActive); // Toggles the isBuyerActive state
    }

    const handleIsBuyerDeActive = () => {
        setIsBuyerActive(false)
    }

    const handleIsMenuActive = () => {
        setIsMenuActive(!isMenuActive)
    }

    const handleIsMenuDeActive = () => {
        setIsMenuActive(false)
    }
    const user = sessionStorage.getItem('user');
    const ParseUser = JSON.parse(user) || {};

    return (
        <section className='home-main-container'>
            <div className="container">
                <div className={`header-parent ${isMenuActive ? 'menu-show' : ''}`}>
                    <header className='header-section'>
                        <div className="container">
                            <div className="img">
                                <img src="https://i.ibb.co/9WWZ6ph/Whats-App-Image-2024-04-14-at-17-38-21-4a5ad39e.jpg" className='img-logo' alt="" />

                                <i onClick={handleIsMenuActive} className="ri-menu-line menu"></i>
                            </div>
                            <div className="ul-parent">
                                <ul className='navbar'>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/'}>Home</Link>
                                    {token ? (
                                        ''
                                    ) : (
                                        <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/register'} >Register</Link>
                                    )}
                                    {token ? (

                                        <Link className='normal-link' onClick={handleLogout} to={'/logout'} >Logout</Link>
                                    ) : (
                                        <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/login'} >Login</Link>

                                    )}
                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/login'} >Login</Link> */}
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/trim-department'} >Trim Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/fabric-department'} >Fabric Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/pattern-Making-department'} >Pattern Making Department</Link>


                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/pattern-cutting-department'} >Pattern Plotting And Cutting Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/fabric-cuting'} >Fabric-Cutting Department</Link>
                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/fabric-cutting-department'} >Fabric Cutting Department</Link> */}
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/sewing-department'} >Sewing Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/finishing-department'} >Finishing Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/qc-check-department'} >QC Check Department</Link>


                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/add-new-style'} >Add New Style</Link>
                                        <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/existing-style'} >Existing Style</Link> */}
                                    <Link to={'/primark-buyer'} onClick={handleIsBuyerActive} className='buyer-hover normal-link' >
                                        Merchandising Department
                                    </Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/existing-style'} >Existing style</Link>
                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/profile'} >Profile</Link> */}
                                </ul>
                            </div>
                        </div>
                    </header>
                    {/* <Header handleIsMenuClose = {handleIsMenuDeActive} /> */}
                </div>
                <div className="content-parent">
                    <div className="top-header">
                        <div className="menu-parent hamburgur">
                            <i onClick={handleIsMenuActive} className="ri-menu-line menu"></i>

                        </div>
                        <div className='dep'>
                            {ParseUser.department ? ParseUser.department : " "}
                        </div>
                        <div className="user">
                            <img src="https://i.ibb.co/TP5qs6w/pngwing-com-2.png" alt="pngwing-com-2" border="0" />
                        </div>
                    </div>
                    <div className="bottom">
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/existing-style' element={<ExistingStyle />} />
                            <Route path='/trim-department' element={<TrimDepartment />} />
                            <Route path='/fabric-department' element={<FiberDepartment />} />
                            <Route path='/pattern-Making-department' element={<PatterDepartment />} />
                            <Route path='/pattern-cutting-department' element={<Cutting />} />
                            <Route path='/pattern-cutting-worker' element={<Cuttingworker />} />
                            <Route path='/fabric-cuting' element={<FABRICUTTING />} />
                            <Route path='/fabric-cuting-worker' element={<FabricCuttingWorker />} />


                            <Route path='/sewing-department' element={<Sewing />} />
                            <Route path='/Pattern-Work' element={<PatternWorkByPerson />} />
                            <Route path='/finishing-department' element={<Finishing />} />
                            <Route path='/qc-check-department' element={<Qc />} />
                            <Route path='/QC-Work' element={<Qcwork />} />
                            <Route path='/primark-buyer' element={<PrimarkBuyer />} />
                            <Route path='/Finishing-work' element={<FinishingWork />} />
                            <Route path='/sewing-work' element={<SewingPerson />} />
                            <Route path='/Assign/:id' element={<AssignWork />} />
                            <Route path='/tna/:id' element={<TNA />} />
                            <Route path='/user-tna/:id' element={<UserTNA />} />

                            <Route path='/add-new-style' element={<AddNewStyle />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
