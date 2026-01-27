import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Message from "../common/Message";

const DepartmentEnter = ({ type }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [kind, setKind] = useState("bad");
    const departmentCredentials = {
        water: {
            username: "water",
            password: "water123",
        },
        road: {
            username: "road",
            password: "road123",
        },
        electrical: {
            username: "electrical",
            password: "electric123",
        },
        municipal: {
            username: "municipal",
            password: "municipal123",
        },
    };


    const handleSubmit = async () => {
        if (!username || !password) {
            setKind("bad");
            setMsg("All fields are required");
            return;
        }

        const creds = departmentCredentials[type];

        if (
            username === creds.username &&
            password === creds.password
        ) {
            setKind("good");
            setMsg("Login successful");

            setTimeout(() => {
                navigate(`/${type}Dashboard`);
            }, 600);
        } else {
            setKind("bad");
            setMsg("Invalid username or password");
        }
    };


    return (
        <div className={`${type}Enter commonEnter`}>
            {/* 🔼 TOP IMAGE */}
            <div className="enterTop">
                <h1>Welcome To {type.charAt(0).toUpperCase() + type.slice(1)} Dashboard</h1>
            </div>

            {/* 🔽 BOTTOM FORM */}
            <div className="enterBottom">
                <Input
                    placeholder="Enter Username"
                    value={username}
                    setValue={setUsername}
                />
                <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    setValue={setPassword}
                />

                <Message kind={kind} text={msg} />

                <div className="detBot" onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </div>
    );
};

export default DepartmentEnter;
