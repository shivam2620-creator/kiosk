import React from 'react'
import "./style.css"
import Sidebar from '../Sidebar/Sidebar'

const MobileSidebar = ({close}) => {
  return (
    <div className="mobile-sidebar-modal">
        <Sidebar close={close} />
        <div className='close-modal' onClick={() => close?.()}>x</div>
    </div>
  )
}

export default MobileSidebar
