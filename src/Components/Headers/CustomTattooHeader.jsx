import React from 'react'
import CustomTattooHeaderImg from "../../assets/header-bg.png"
import logo1 from "../../assets/logo-1.png"

import "./style.css"
const CustomTattooHeader = () => {
  return (
    <div className="header custom-tattoo-header">
       <img src={logo1} alt="certified tattoo logo" />
    </div>
  )
}

export default CustomTattooHeader
