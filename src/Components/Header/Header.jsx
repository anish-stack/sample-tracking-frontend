import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header({handleIsMenuDeActive}) {
    const token = sessionStorage.getItem('token')
    return (
        <header className='header-section'>
            <div className="container">
                <div className="img">
                    <img src="https://i.ibb.co/583KdcR/Whats-App-Image-2024-04-08-at-22-30-52-5583a449.jpg" alt="" />
                </div>
                <div className="ul-parent">
                <ul className='navbar'>
                    <Link onClick={handleIsMenuDeActive} className='' to={'/'}>Home</Link>
                    <Link to={'/trim-department'} >Trim Department</Link>
                    <Link to={'/fabric-department'} >Fabric Department</Link>
                    <Link to={'/manufacture'} >Manufacture</Link>
                    <Link to={'/primark'} >Primark</Link>
                    <Link to={'/asos'} >ASOS</Link>
                    <Link to={'/existing-style'} >Existing Style</Link>
                    <Link to={'/register'} >Register</Link>
                    <Link to={'/num-tag'} >Numtag</Link>
                    <Link to={'/next'} >Next</Link>
                    <Link to={'/georsge'} >Georsge</Link>
                    {token ? (

                    <Link to={'/logout'} >Logout</Link>
                    ):(
                    <Link to={'/login'} >Login</Link>

                    )}
                     <Link to={'/existing-style'} >Existing style</Link>
                    <Link to={'/profile'} >Profile</Link>
                </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
