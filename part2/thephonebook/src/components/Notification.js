const Notification = ({message}) => {
  const error = {
    color: "red",
    fontStyle: "bold",
    fontSize: 22,
    backgroundColor: "#d7ddda",
    borderColor: "red",
    borderRadius: 5
  };
  const success = {
    color: "green",
    fontStyle: "bold",
    fontSize: 22,
    backgroundColor: "#d7ddda",
    borderColor: "green",
    borderRadius: 5
  };

  if (message === null) {
    return null;
  }

  return <div style={message[1] ? error : success} className="error">{message[0]}</div>;
};

export default Notification;
