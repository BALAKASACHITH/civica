import {useNavigate} from 'react-router-dom'
const GetStarted = () => {
    const navigate=useNavigate()
    return (
        <div className="GetStarted">
            <div className="gsTop">
                <div className="gsCard" onClick={() => navigate('/Start/User')}>
                    <div className="gsImg user"></div>
                    <div className="gsText">User</div>
                </div>
                <div className="gsCard">
                    <div className="gsImg municipal"></div>
                    <div className="gsText">Municipal</div>
                </div>
                <div className="gsCard">
                    <div className="gsImg electrical"></div>
                    <div className="gsText">Electrical</div>
                </div>
            </div>
            <div className="gsBot">
                <div className="gsCard">
                    <div className="gsImg water"></div>
                    <div className="gsText">Water</div>
                </div>
                <div className="gsCard">
                    <div className="gsImg road"></div>
                    <div className="gsText">Road</div>
                </div>
            </div>
        </div>
    )
}
export default GetStarted
