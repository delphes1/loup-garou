import React from "react";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";

export const App = () => {
  // Vous pouvez ajouter un router ici si vous préférez utiliser des routes
  // Pour cet exemple, nous allons simplement alterner les composants pour simplifier

  return (
    <div style={{display: "flex", flexDirection:"column", height:"100vh"}}>
      <h1>Loup Garou</h1>
      <div>
      <CreateRoom />
      <JoinRoom />
      {/* Supposons que RoomID est obtenu via un état ou des props */}
      {/* <Room roomId="1234" /> */}
      </div>
    </div>
  );
}
