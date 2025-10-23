import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PiercingHeader from '../Components/Headers/PiercingHeader'

import { AnimatePresence,motion } from 'framer-motion'
import "./style.css"
import CustomTattooHeader from '../Components/Headers/CustomTattooHeader'


const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35 } }
};
const WelcomeLayout = () => {
  const {pathname: path} = useLocation();
  return (
   
    <div className="welcome-screen">

            <CustomTattooHeader />
           <AnimatePresence mode='wait' >
        <div className="pages-container">
              <motion.div
            key={path}
            className="appointment-detail-cont"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
             <Outlet />
          </motion.div>
        </div>
       </AnimatePresence>
    </div>
   
  )
}

export default WelcomeLayout
