import React from "react";

const CharacterCard = ({ character }) => {
  const statusColor =
    character.status === "Alive" ? "bg-green-500" : "bg-red-500";
  return (
    <div className="card bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{character.name}</h2>
      <div>
        <p className={`w-4 h-4 rounded-full ${statusColor}`}></p>
      </div>
    </div>
  );
};

export default CharacterCard;
