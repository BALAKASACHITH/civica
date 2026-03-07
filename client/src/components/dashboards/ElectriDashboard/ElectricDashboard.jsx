import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import ElectricComplaints from "./pages/Complaints/ElectricComplaints";

const ElectricDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Start/Electric", { replace: true });
    };

    return (
        <div className="ElectricDashboard">
            <div className="edLeft">

                <div
                    className="edlTop"
                    onClick={() => navigate("/ElectricDashboard")}
                ></div>

                <div className="edlMid">
                    <div
                        className="edlmOne"
                        onClick={() => navigate("/ElectricDashboard")}
                        style={{
                            backgroundColor:
                                location.pathname === "/ElectricDashboard"
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-file-lines"></i>&nbsp;
                        Complaints
                    </div>
                </div>

                <div className="edlBottom" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </div>
            </div>

            <div className="edRight">
                <Routes>
                    <Route index element={<ElectricComplaints />} />
                </Routes>
            </div>
        </div>
    );
};

export default ElectricDashboard;