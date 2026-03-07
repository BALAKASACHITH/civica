import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import WaterComplaints from "./pages/Complaints/WaterComplaints";

const WaterDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Start/Water", { replace: true });
    };

    return (
        <div className="WaterDashboard">
            <div className="wdLeft">

                <div
                    className="wdlTop"
                    onClick={() => navigate("/WaterDashboard")}
                ></div>

                <div className="wdlMid">
                    <div
                        className="wdlmOne"
                        onClick={() => navigate("/WaterDashboard")}
                        style={{
                            backgroundColor:
                                location.pathname === "/WaterDashboard"
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-file-lines"></i>&nbsp;
                        Complaints
                    </div>
                </div>

                <div className="wdlBottom" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </div>
            </div>

            <div className="wdRight">
                <Routes>
                    <Route index element={<WaterComplaints />} />
                </Routes>
            </div>
        </div>
    );
};

export default WaterDashboard;