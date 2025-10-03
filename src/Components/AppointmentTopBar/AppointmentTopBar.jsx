import React from 'react'
import "./style.css"
import BackButton from '../BackButtoon/BackButton'

const AppointmentTopBar = ({title}) => {
  return (
    <div className="appointment-top-bar">
        <h1>{title}</h1>
        <BackButton />

    </div>
  )
}

export default AppointmentTopBar
