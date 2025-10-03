
import "./style.css"

const PiercingDetail = ({details}) => {
  return (
    <div className="piercing-detail">
        <h3>Piercing Details: </h3>
        <div className="piercing-detail-secton">
            <div className="piercing-detail-img-section">
                <img src={details.img} alt="custom tattoo image" width="100%" height="100%"  />
            </div>

            <div className="piercing-details">
                <h2>{details.type}</h2>
                {/* <p> <span>Tattoo Option:</span> {details.tattooOption}</p>
                <p><span>Size of Tattoo:</span> {details.size}</p> */}
            </div>
        </div>
      
    </div>
  )
}

export default PiercingDetail
