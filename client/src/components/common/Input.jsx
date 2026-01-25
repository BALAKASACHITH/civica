const Input = ({ type = "text", placeholder, value, setValue }) => {
    return (
        <div className="inputBox">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};
export default Input;
