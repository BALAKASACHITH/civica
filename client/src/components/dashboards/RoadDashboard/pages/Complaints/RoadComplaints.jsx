import { useEffect, useState } from "react";
import axios from "axios";

const RoadComplaints = () => {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get(
                "http://localhost:2000/complaints/road"
            );

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

    if (loading) return <div className="RoadComplaints">Loading...</div>;

    return (
        <div className="RoadComplaints">
            <h2>Road Department Complaints</h2>

            {complaints.length === 0 && <p>No complaints found.</p>}

            <div className="deptContainer">
                {complaints.map((item) => (
                    <div key={item._id} className="deptCard">

                        <img
                            src={`http://localhost:2000/${item.imagePath.replace(/\\/g, "/")}`}
                            alt="complaint"
                        />

                        <div className="deptInfo">
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

export default RoadComplaints;