import React from 'react'
import './PrimarkBuyer.css'
import { Link } from 'react-router-dom'

function PrimarkBuyer() {
  return (
    <section className='primarkBuyer-section'>
      <div className="container">
        <Link to={'/add-new-style'}>Add New Style</Link>
        <Link to={'/existing-style'}>Existing Style</Link>
      </div>
    </section>
  )
}

export default PrimarkBuyer
