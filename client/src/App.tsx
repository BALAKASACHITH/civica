import Land from './components/Landing/Land'
import {Routes,Route} from 'react-router-dom'
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/*' element={<Land/>} ></Route>
            </Routes>
        </div>
    )
}
export default App