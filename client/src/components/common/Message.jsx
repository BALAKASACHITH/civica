const Message = ({ kind, text }) => {
    if (!text) return null;

    return (
        <div className={`message ${kind}`}>
            {text}
        </div>
    );
};
export default Message;
