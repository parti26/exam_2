import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const getHits = (albumId) =>
  fetch(`/api/albums/${albumId}/hits`).then((res) => res.json());

export default function AlbumDetails() {
  const { albumId } = useParams();
  const query = useQuery({
    queryKey: ["hits", albumId],
    queryFn: () => getHits(albumId),
  });

  if (query.isLoading) {
    return (
      <div className="grid grid-rows-3 gap-3 w-5/6 mx-auto">
        <Loading />
        <Loading />
        <Loading />
      </div>
    );
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  if (!query.data || !query.data.hits || query.data.hits.length === 0) {
    return <div>No hits found for this album.</div>;
  }

  const sortedHits = query.data.hits.sort((a, b) => a.length - b.length);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Hits for Album ID: {albumId}
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Length</th>
              <th className="py-3 px-6 text-left">Popularity</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedHits.map((hit) => (
              <tr
                key={hit.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {hit.title}
                </td>
                <td className="py-3 px-6 text-left">{hit.length} mins</td>
                <td className="py-3 px-6 text-left">{hit.popularityIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className="m-3 block" to="/">
          <IoArrowBackCircleSharp size={32} />
        </Link>
      </div>
    </div>
  );
}
