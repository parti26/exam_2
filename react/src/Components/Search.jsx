import React from "react";

const AlbumSearch = ({ searchTerm, setSearchTerm }) => (
  <main id="albums" className="flex flex-col items-center h-screen p-6">
    <input
      type="text"
      placeholder="Search for an album..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm"
    />
  </main>
);

export default AlbumSearch;
