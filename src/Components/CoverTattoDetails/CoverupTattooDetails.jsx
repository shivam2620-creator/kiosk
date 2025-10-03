
import "./style.css"

const CoverupTattooDetail = ({details}) => {
  return (
    <div className="coverup-tattoo-detail">
        <h3>Coverup / Rework Tattoo Details : </h3>
        <div className="coverup-tattoo-detail-secton">
            <div className="coverup-tattoo-detail-img-section">
                <img src={details.img} alt="custom tattoo image" width="100%" height="100%"  />
            </div>

            <div className="coverup-tattoo-details">
                <h2>Coverup / Rework Tattoos</h2>
                <p> <span>Tattoo Placement:</span> {details.placement}</p>
                <p><span>Size of Tattoo:</span> {details.size}</p>
                <p><span>Color:</span> {details.color}</p>
            </div>
        </div>
      
    </div>
  )
}

export default CoverupTattooDetail
