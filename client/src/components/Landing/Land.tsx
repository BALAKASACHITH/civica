import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import GetStarted from './GetStarted'
import LandHome from './LandHome'
import UserEnter from './UserEnter'
const Land = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className='Land'>
            <div className="LandNavbar">
                <div className="lnLeft">
                    <div className="inlLogo"></div>
                </div>
                <div className="lnRight">
                    <div
                        className={`lnrHome ${location.pathname === '/' ? 'active' : ''}`}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </div>
                    <div
                        className={`lnrStart ${location.pathname.startsWith('/Start') ? 'active' : ''}`}
                        onClick={() => navigate('/Start')}
                    >
                        GetStarted
                    </div>
                </div>
            </div>
            <div className="LandBody">
                <Routes>
                    <Route path='/' element={<LandHome />} />
                    <Route path='/Start' element={<GetStarted />} />
                    <Route path='/Start/User' element={<UserEnter />} ></Route>
                </Routes>
            </div>
        </div>
    )
}
export default Land