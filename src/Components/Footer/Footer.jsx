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

        {  <div className="footer-tattoo-details">

          <div className="footer-servic-img">
            {isActive && <img src={customTattooDetail.img || flashTattoDetail.img || coverupTattooDetail.img || piercingDetail.img} alt="" width="100%" height="100%"   />}
          </div>

          {/* custom tattoo */}

         { customTattooDetail.isActive && <div className="footer-service-detail">
            <h3>Custom Tattoos</h3>
            {customTattooDetail.tattoo_option && <div className="footer-service-detail-info">
                <p>Tattoo Option: </p>
               <p>{customTattooDetail.tattoo_option}</p>
            </div>}

            {customTattooDetail.size && <div className="footer-service-detail-info">
               <p>Size of Tattoo: </p>
               <p>{customTattooDetail.tattoo_size}</p>
            </div>}
             
            
          </div>
          }
         {/* flash tattoo */}
          { flashTattoDetail.isActive && <div className="footer-service-detail">
            {flashTattoDetail.tattooOption && <h3>{flashTattoDetail.tattooOption}</h3>}
            
            {flashTattoDetail.tattoo_size && <div className="footer-service-detail-info ">
               <p>Size: </p>
               <p className="flash-tattoo-service-size">{flashTattoDetail.tattoo_size}</p>
            </div>}
             
             {/* {flashTattoDetail.location.name && <div className="footer-service-detail-info">
                <p>Locaion:  </p>
               <p>{flashTattoDetail.location.name}</p>
            </div>} */}
            
          </div>
          }

          {/* piercing detail */}
          { piercingDetail.isActive && <div className="footer-service-detail">
            {piercingDetail.sub_type && <h3>{piercingDetail.sub_type }</h3>}
          </div>
          }
          {/* coverup tattoo */}
          { coverupTattooDetail.isActive && <div className="footer-service-detail">
            {<h3>Coverup / Rework Tattoos</h3>}
            
            {coverupTattooDetail.tattoo_placement && <div className="footer-service-detail-info ">
               <p>Tattoo Placement : </p>
               <p >{coverupTattooDetail.tattoo_placement}</p>
            </div>}
             
             {coverupTattooDetail.tattoo_size && <div className="footer-service-detail-info">
                <p>Size of Tattoo:  </p>
               <p>{coverupTattooDetail.tattoo_size}</p>
            </div>
            }
            {coverupTattooDetail.tattoo_color && <div className="footer-service-detail-info">
                <p>Color:  </p>
               <p>{coverupTattooDetail.tattoo_color}</p>
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
