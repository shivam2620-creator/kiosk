import "./style.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomTattooHeader from "../../Components/Headers/CustomTattooHeader";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlashTattoHeader from "../../Components/Headers/FlashTattoHeader";
import PiercingHeader from "../../Components/Headers/PiercingHeader";
import { AnimatePresence,motion } from 'framer-motion';
import useMobile from "../../CustomHook/useMobile";
import MobileSidebar from "../../Components/MobileSidebar/MobileSidebar";
import { s } from "framer-motion/client";



const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35 } }
};
const AppointmentBookingLayout = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [showMobileSidebar,setShowMobileSidebar] = useState(true);
  const {pathname: path} = useLocation();
  const [header ,setHeader ] = useState( <CustomTattooHeader />);

  useEffect(() => {
    switch(true){
      case path.includes("flash-tattoo") :
      setHeader(<FlashTattoHeader />)
      break;

      case path.includes("piercing"):
      setHeader(<PiercingHeader />);
      break

      default:
        setHeader(<CustomTattooHeader />)
    }
  },[path])
  return (
    <div>
      {
        header
      }
      <div className="appointment-cont">
        
        
       
             <Sidebar />
           {/* {isMobile && showMobileSidebar && <MobileSidebar close={() => setShowMobileSidebar(false)}/>} */}
        
         
        <AnimatePresence mode='wait'>

        <div className="appointment-detail-cont">
           
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

      {<Footer />}
    </div>
  );
};

export default AppointmentBookingLayout;
