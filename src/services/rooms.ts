import { collection, addDoc, query, where, getDocs, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";


export const createRoom = async (narratorName: string) => {
  const roomCode = Math.floor(1000 + Math.random() * 9000).toString(); // Génère un code à 4 chiffres

  try {
    const docRef = await addDoc(collection(db, "rooms"), {
      roomCode,
      narratorName,
      participants: [{ name: narratorName, role: 'Narrator' }],
      createdAt: Date.now(),
    });
    console.log("Room successfully created with ID: ", docRef.id);
    return roomCode; // Renvoie le code de la room au narrateur
  } catch (error) {
    console.error("Error creating room: ", error);
  }
};

export const joinRoom = async (roomCode: string, participantName: string) => {
    // Recherche la room par code
    const roomsRef = collection(db, "rooms");
    const q = query(roomsRef, where("roomCode", "==", roomCode));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      console.log("No matching room found.");
      return;
    }
  
    // Supposons qu'il n'y ait qu'une seule room correspondant à ce code
    const roomDoc = querySnapshot.docs[0];
  
    // Ajoute le participant à la room
    try {
      await updateDoc(doc(db, "rooms", roomDoc.id), {
        participants: arrayUnion({ name: participantName })
      });
      console.log(`${participantName} has joined the room.`);
    } catch (error) {
      console.error("Error joining room: ", error);
    }
  };