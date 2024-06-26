import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import AlbumSearch from "../Components/Search";

const getAlbums = () => fetch("/api/albums").then((res) => res.json());

export default function Albums() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAlbum, setOpenAlbum] = useState(null);
  const query = useQuery({ queryKey: ["albums"], queryFn: getAlbums });

  if (query.isLoading) {
    return (
      <main id="albums" className="flex justify-center items-center h-screen">
        <div className="w-3/4 h-3/4 bg-white shadow-md border border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center">
          <p className="text-4xl text-center">Loading...</p>
        </div>
      </main>
    );
  }

  const filteredAlbums = query.data.albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main
      id="albums"
      className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50"
    >
      <AlbumSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex justify-center items-center flex-grow w-full">
        <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="flex justify-center bg-white shadow-md border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() =>
                setOpenAlbum(openAlbum === album.id ? null : album.id)
              }
            >
              <h2 className="text-2xl font-bold">{album.name}</h2>
              {openAlbum === album.id && (
                <div className="mt-2">
                  <p>Release Year: {album.releaseYear}</p>
                  <p>Popularity: {album.popularity}</p>
                  <Link
                    to={`/albums/${album.id}/hits`}
                    className="text-blue-500 underline"
                  >
                    View Hits
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
