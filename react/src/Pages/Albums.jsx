import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const getAlbums = () => fetch("/api/albums").then((res) => res.json());

export default function Albums() {
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

  return (
    <main id="albums" className="flex justify-center items-center h-screen">
      <div className="w-3/4 h-3/4 bg-white shadow-md border border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center">
        {query.data.albums.map((album) => (
          <div key={album.name}>
            <h2 className="text-2xl font-bold">{album.name}</h2>
            <Link
              className="underline flex items-center"
              to={`/albums/${album.name}`}
            ></Link>
          </div>
        ))}
      </div>
    </main>
  );
}
