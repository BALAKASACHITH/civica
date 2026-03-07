import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import RoadComplaints from "./pages/Complaints/RoadComplaints";

const RoadDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Start/Road", { replace: true });
    };

    return (
        <div className="RoadDashboard">
            <div className="rdLeft">

                <div
                    className="rdlTop"
                    onClick={() => navigate("/RoadDashboard")}
                ></div>

                <div className="rdlMid">
                    <div
                        className="rdlmOne"
                        onClick={() => navigate("/RoadDashboard")}
                        style={{
                            backgroundColor:
                                location.pathname === "/RoadDashboard"
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-file-lines"></i>
                        Complaints
                    </div>
                </div>

                <div className="rdlBottom" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </div>
            </div>

            <div className="rdRight">
                <Routes>
                    <Route index element={<RoadComplaints />} />
                </Routes>
            </div>
        </div>
    );
};

export default RoadDashboard;