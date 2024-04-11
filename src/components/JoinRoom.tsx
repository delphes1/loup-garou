// src/components/JoinRoom.tsx
import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { joinRoom } from "../services/rooms";

const JoinRoom: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleJoinRoom = async () => {
    await joinRoom(roomCode, name);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
