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
import PrimarkBuyer from '../PrimarkBuyer/PrimarkBuyer'
import TrimDepartment from '../TrimDepartment/TrimDepartment'
import George from '../George/George'
import Nutmeg from '../Nutmeg/Nutmeg'
import Next from '../Next/Next'
import Pourmoi from '../Pourmoi/Pourmoi'
import Lipsy from '../Lipsy/Lipsy'
import Mango from '../Mango/Mango'
import Asos from '../Asos/Asos'
import Noon from '../Noon/Noon'
import Brownie from '../Brownie/Brownie'
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

    return (
        <section className='home-main-container'>
            <div className="container">
                <div className={`header-parent ${isMenuActive ? 'menu-show' : ''}`}>
                    <header className='header-section'>
                        <div className="container">
                            <div className="img">
                                <img src="https://i.ibb.co/583KdcR/Whats-App-Image-2024-04-08-at-22-30-52-5583a449.jpg" className='img-logo' alt="" /><span>Sample Tracking</span>
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

                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/pattern-cutting-department'} >Pattern Cutting Department</Link>
                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/fabric-cutting-department'} >Fabric Cutting Department</Link> */}
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/sewing-department'} >Sewing Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/finishing-department'} >Finishing Department</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/qc-check-department'} >QC Check Department</Link>


                                    {/* <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/add-new-style'} >Add New Style</Link>
                                        <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/existing-style'} >Existing Style</Link> */}
                                    <Link to={'/primark-buyer'} onClick={handleIsBuyerActive} className='buyer-hover normal-link' >
                                        Buyers
                                        {/* <ul className={`buyer-dropdown ${isBuyerActive ? 'isbuyershow' : ''}`}>
                                            <Link onClick={handleIsBuyerDeActive} to={'/primark-buyer'}>Primark</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/george'}>George</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/nutmag'}>Nutmag</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/next'}>Next</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/pourmoi'}>Pourmoi</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/lipsy'}>Lipsy</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/mango'}>Mango</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/asos'}>Asos</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/noon'}>Noon</Link>
                                            <Link onClick={handleIsBuyerDeActive} to={'/brownie'}>Brownie</Link>
                                        </ul> */}
                                    </Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/existing-style'} >Existing style</Link>
                                    <Link className='normal-link' onClick={handleIsMenuDeActive} to={'/profile'} >Profile</Link>
                                </ul>
                            </div>
                        </div>
                    </header>
                    {/* <Header handleIsMenuClose = {handleIsMenuDeActive} /> */}
                </div>
                <div className="content-parent">
                    <div className="top-header">
                        <div className="menu-parent">
                            <i onClick={handleIsMenuActive} className="ri-menu-line menu"></i>
                            {/* <div className="input-box">
                        <input type="text" />
                    </div>
                    <i class="ri-search-line search"></i> */}
                        </div>
                        <div className="user">
                            <i class="ri-user-line"></i>
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

                            <Route path='/sewing-department' element={<Sewing />} />
                            <Route path='/Pattern-Work' element={<PatternWorkByPerson />} />
                            <Route path='/finishing-department' element={<Finishing />} />
                            <Route path='/qc-check-department' element={<Qc />} />
                            <Route path='/QC-Work' element={<Qcwork />} />
                            <Route path='/Finishing-work' element={<FinishingWork />} />
                            <Route path='/sewing-work' element={<SewingPerson />} />












                            <Route path='/Assign/:id' element={<AssignWork />} />


                            <Route path='/tna/:id' element={<TNA />} />
                            <Route path='/add-new-style' element={<AddNewStyle />} />
                            <Route path='/primark-buyer' element={<PrimarkBuyer />} />
                            <Route path='/george' element={<George />} />
                            <Route path='/nutmag' element={<Nutmeg />} />
                            <Route path='/next' element={<Next />} />
                            <Route path='/pourmoi' element={<Pourmoi />} />
                            <Route path='/lipsy' element={<Lipsy />} />
                            <Route path='/mango' element={<Mango />} />
                            <Route path='/asos' element={<Asos />} />
                            <Route path='/noon' element={<Noon />} />
                            <Route path='/brownie' element={<Brownie />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
