import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import MunicipalComplaints from "./pages/Complaints/MunicipalComplaints";

const MunicipalDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Start/Municipal", { replace: true });
    };

    return (
        <div className="MunicipalDashboard">
            <div className="mdLeft">

                <div
                    className="mdlTop"
                    onClick={() => navigate("/MunicipalDashboard")}
                ></div>

                <div className="mdlMid">
                    <div
                        className="mdlmOne"
                        onClick={() => navigate("/MunicipalDashboard")}
                        style={{
                            backgroundColor:
                                location.pathname === "/MunicipalDashboard"
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-file-lines"></i>&nbsp;
                        Complaints
                    </div>
                </div>

                <div className="mdlBottom" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </div>
            </div>

            <div className="mdRight">
                <Routes>
                    <Route index element={<MunicipalComplaints />} />
                </Routes>
            </div>
        </div>
    );
};

export default MunicipalDashboard;