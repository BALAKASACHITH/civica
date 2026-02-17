import Land from './components/Landing/Land'
import UserDashboard from './components/dashboards/userDashboard/UserDashboard'
import {Routes,Route} from 'react-router-dom'
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/*' element={<Land/>} ></Route>
                <Route path='/UserDashboard/*' element={<UserDashboard/>} ></Route>
            </Routes>
        </div>
    )
}
export default App