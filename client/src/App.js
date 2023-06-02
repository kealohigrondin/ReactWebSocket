import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [inMessages, setInMessages] = useState([]);
  const [roomNumber, setRoomNumber] = useState(0);

  const sendMessage = () => {
    if (message !== "") socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
        setInMessages(inMessages => [...inMessages, data.message]);
    });
  }, [socket]);

  return (
    <div className="App">
      <div className="flex flex-col items-center gap">
        <p className="text-white text-2xl">Room {roomNumber}</p>
        <input
          type="number"
          placeholder="enter room number"
          onChange={(event) => setRoomNumber(event.target.value)}
        />
        <input
          placeholder="message..."
          className="w-1/4 mt-8 mb-2 p-2 rounded-sm"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white py-2 px-6 mb-10 rounded-lg"
        >
          Send Message
        </button>
        {inMessages}
        {inMessages.map((inMessage, index) => (
          <p key={index} className="text-lg text-white my-2">
            {inMessage}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
