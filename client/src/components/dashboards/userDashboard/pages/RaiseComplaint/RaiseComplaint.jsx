import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RaiseComplaint = () => {

    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(null);
    const [message, setMessage] = useState("");
    const [kind, setKind] = useState("");

    // 📍 Get Live Location
    const getLocation = () => {
        if (!navigator.geolocation) {
            setKind("bad");
            setMessage("Geolocation not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setKind("good");
                setMessage("Location captured successfully.");
            },
            () => {
                setKind("bad");
                setMessage("Location permission denied.");
            }
        );
    };

    // 📂 Handle Image Drop
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    // 🚀 Submit Complaint
    const handleSubmit = async () => {

        if (!image || !description) {
            setKind("bad");
            setMessage("All fields are required.");
            return;
        }

        if (!location) {
            setKind("bad");
            setMessage("Location not captured yet.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setKind("bad");
                setMessage("Authentication failed.");
                return;
            }

            const decoded = jwtDecode(token);
            const email = decoded.email;

            const formData = new FormData();
            formData.append("email", email);
            formData.append("image", image);
            formData.append("description", description);
            formData.append("lat", location.lat);
            formData.append("lng", location.lng);

            const res = await axios.post(
                "http://localhost:2000/raise-complaint",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {

                const department = res.data.department;

                setKind("good");
                setMessage(
                    `Complaint submitted successfully! Assigned to ${department.toUpperCase()} department.`
                );

                // Reset fields
                setImage(null);
                setDescription("");
                setLocation(null);

            } else {
                setKind("bad");
                setMessage(res.data.message);
            }

        } catch (err) {
            setKind("bad");
            setMessage("Submission failed. Try again. Error: " + err.message);
        }
    };


    return (
        <div className="RaiseComplaint">
            <div className="rcCard">

                <h2>Raise Complaint</h2>

                {/* Drag & Drop Area */}
                <div
                    className="dropArea"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {image ? (
                        <p>{image.name}</p>
                    ) : (
                        <>
                            <p>Drag & Drop Image Here</p>
                            <p>or</p>
                            <label className="browseBtn">
                                Browse
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </>
                    )}
                </div>

                {/* Description */}
                <textarea
                    placeholder="Enter description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Capture Location */}
                <div className="locBtn" onClick={getLocation}>
                    <i className="fa-solid fa-location-dot"></i>&nbsp;
                    Capture Location
                </div>

                {/* Message */}
                {message && (
                    <div className={`rcMessage ${kind}`}>
                        {message}
                    </div>
                )}

                {/* Submit */}
                <div className="submitBtn" onClick={handleSubmit}>
                    Submit Complaint
                </div>

            </div>
        </div>
    );
};

export default RaiseComplaint;