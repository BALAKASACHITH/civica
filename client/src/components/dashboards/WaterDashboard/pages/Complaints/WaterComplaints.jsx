import { useEffect, useState } from "react";
import axios from "axios";

const WaterComplaints = () => {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get("http://localhost:2000/complaints/water");

            if (res.data.success) {
                setComplaints(res.data.complaints);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    if (loading) return <div className="WaterComplaints">Loading...</div>;

    return (
        <div className="WaterComplaints">

            <h2>Water Department Complaints</h2>

            {complaints.length === 0 && <p>No complaints found.</p>}

            <div className="wcContainer">
                {complaints.map((item) => (
                    <div key={item._id} className="wcCard">

                        <img
                            src={`http://localhost:2000/${item.imagePath.replace("\\", "/")}`}
                            alt="complaint"
                        />

                        <div className="wcInfo">
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Location:</strong> {item.location.lat}, {item.location.lng}</p>
                            <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default WaterComplaints;