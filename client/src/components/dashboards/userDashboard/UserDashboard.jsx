import { jwtDecode } from "jwt-decode";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserHome from "./pages/UserHome/UserHome";
import UserComplaints from "./pages/UserComplaints/UserComplaints";
import RaiseComplaint from "./pages/RaiseComplaint/RaiseComplaint";

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    let email = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            email = decoded?.email || null;
        } catch {
            email = null;
        }
    }

    useEffect(() => {
        if (!email) {
            navigate("/Start/User", { replace: true });
        }
    }, [email, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Start/User", { replace: true });
    };

    if (!email) return null;

    return (
        <div className="UserDashboard">
            <div className="usdLeft">
                <div className="usdlTop"
                        onClick={() => navigate("/UserDashboard")} ></div>

                <div className="usdlMid">
                    <div
                        className="usdlmOne"
                        onClick={() => navigate("/UserDashboard")}
                        style={{
                            backgroundColor:
                                location.pathname === "/UserDashboard"
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-house"></i> Home
                    </div>

                    <div
                        className="usdlmTwo"
                        onClick={() => navigate("/UserDashboard/complaints")}
                        style={{
                            backgroundColor:
                                location.pathname.includes("/UserDashboard/complaints")
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-file-lines"></i> My Complaints
                    </div>

                    <div
                        className="usdlmThree"
                        onClick={() => navigate("/UserDashboard/raise")}
                        style={{
                            backgroundColor:
                                location.pathname.includes("/UserDashboard/raise")
                                    ? "#3b82f6"
                                    : "transparent"
                        }}
                    >
                        <i className="fa-solid fa-plus"></i> Raise Complaint
                    </div>
                </div>

                <div className="usdlBottom" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </div>
            </div>

            <div className="usdRight">
                <Routes>
                    <Route index element={<UserHome />} />
                    <Route path="complaints/*" element={<UserComplaints />} />
                    <Route path="raise/*" element={<RaiseComplaint />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboard;
