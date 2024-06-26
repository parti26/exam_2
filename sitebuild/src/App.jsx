import React from "react";
import CharacterCard from "./Components/CharacterCard";
import Header from "./Components/Header";
import "./index.css";

const characters = [
  { name: "Naruto Uzumaki", status: "Alive" },
  { name: "Sasuke Uchiha", status: "Alive" },
  { name: "Sakura Haruno", status: "Alive" },
  { name: "Kakashi Hatake", status: "Alive" },
  { name: "Obito Uchiha", status: "Deceased" },
  { name: "Madara Uchiha", status: "Deceased" },
  { name: "Hashirama Senju", status: "Deceased" },
  { name: "Tobirama Senju", status: "Deceased" },
  { name: "Hiruzen Sarutobi", status: "Deceased" },
  { name: "Minato Namikaze", status: "Deceased" },
];

function App() {
  return (
    <div className="App">
      <Header />
      <main className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
