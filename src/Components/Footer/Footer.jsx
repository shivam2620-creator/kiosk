import "./style.css"
import visitUsImg from "../../assets/visit-us.png"
import { useContinue } from "../../Provider/ContinueContext"
import { useLocation } from "react-router-dom"

import { useSelector } from "react-redux"
import { use } from "react"

const Footer = () => {
  const customTattooDetail = useSelector((state) => state.customTattoo)
  const flashTattoDetail = useSelector((state) => state.flashTattoo);
  const coverupTattooDetail = useSelector((state)=> state.coverupTattoo)
  const piercingDetail = useSelector((state) => state.piercing);
 
  const isActive = customTattooDetail.isActive || flashTattoDetail.isActive || coverupTattooDetail.isActive || piercingDetail.isActive;

  const {pathname: path} = useLocation();



  const {onContinue} = useContinue();


  return (
    <div className="footer">
        <div className="footer-visit-us-img">
             <img src={visitUsImg} alt="visit-us" width="100%" height="100%" />
        </div>

        { !path.includes("book-appointment") && <div className="footer-tattoo-details">

          <div className="footer-servic-img">
            {isActive && <img src={customTattooDetail.img || flashTattoDetail.img || coverupTattooDetail.img || piercingDetail.img} alt="" width="100%" height="100%"   />}
          </div>

          {/* custom tattoo */}

         { customTattooDetail.isActive && <div className="footer-service-detail">
            <h3>Custom Tattoos</h3>
            {customTattooDetail.tattooOption && <div className="footer-service-detail-info">
                <p>Tattoo Option: </p>
               <p>{customTattooDetail.tattooOption}</p>
            </div>}

            {customTattooDetail.size && <div className="footer-service-detail-info">
               <p>Size of Tattoo: </p>
               <p>{customTattooDetail.size}</p>
            </div>}
             
            
          </div>
          }
         {/* flash tattoo */}
          { flashTattoDetail.isActive && <div className="footer-service-detail">
            {flashTattoDetail.tattooOption && <h3>{flashTattoDetail.tattooOption}</h3>}
            
            {flashTattoDetail.size && <div className="footer-service-detail-info ">
               <p>Size: </p>
               <p className="flash-tattoo-service-size">{flashTattoDetail.size}</p>
            </div>}
             
             {flashTattoDetail.location.name && <div className="footer-service-detail-info">
                <p>Locaion:  </p>
               <p>{flashTattoDetail.location.name}</p>
            </div>}
            
          </div>
          }

          {/* piercing detail */}
          { piercingDetail.isActive && <div className="footer-service-detail">
            {piercingDetail.type && <h3>{piercingDetail.type }</h3>}
          </div>
          }
          {/* coverup tattoo */}
          { coverupTattooDetail.isActive && <div className="footer-service-detail">
            {<h3>Coverup / Rework Tattoos</h3>}
            
            {coverupTattooDetail.placement && <div className="footer-service-detail-info ">
               <p>Tattoo Placement : </p>
               <p >{coverupTattooDetail.placement}</p>
            </div>}
             
             {coverupTattooDetail.size && <div className="footer-service-detail-info">
                <p>Size of Tattoo:  </p>
               <p>{coverupTattooDetail.size}</p>
            </div>
            }
            {coverupTattooDetail.color && <div className="footer-service-detail-info">
                <p>Color:  </p>
               <p>{coverupTattooDetail.color}</p>
            </div>
            }

            
            
          </div>
          }
          
        </div>}

        { !path.includes("book-appointment") && <button onClick={onContinue}>Continue</button>}

       
             
         
        </div>
      
   
  )
}

export default Footer
