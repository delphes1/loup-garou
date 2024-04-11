// src/components/Room.tsx
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

interface Participant {
  name: string;
  role?: string;
}

interface RoomProps {
  roomId: string;
}

export const Room: React.FC<RoomProps> = ({ roomId }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rooms", roomId), (doc) => {
      const roomData = doc.data();
      if (roomData && roomData.participants) {
        setParticipants(roomData.participants as Participant[]);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <div>
      <h2>Room Participants</h2>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant.name}</li>
        ))}
      </ul>
    </div>
  );
};
