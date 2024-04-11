// src/components/CreateRoom.tsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const CreateRoom: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>("");

  const handleCreateRoom = async () => {
    const roomCode = Math.floor(1000 + Math.random() * 9000).toString(); // Génère un code à 4 chiffres
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        roomCode,
        participants: [{ name: "Narrator", role: 'Narrator' }], // Ajoutez d'autres champs initiaux si nécessaire
        createdAt: Date.now(),
      });
      setRoomCode(roomCode); // Sauvegarde le code de la room pour l'afficher au narrateur
      console.log("Room successfully created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      {roomCode && <p>Room Code: {roomCode}</p>}
    </div>
  );
};

export default CreateRoom;
