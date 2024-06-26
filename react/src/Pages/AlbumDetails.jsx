import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const getHits = (albumId) =>
  fetch(`/api/albums/${albumId}/hits`).then((res) => res.json());

export default function AlbumDetails() {
  const { albumId } = useParams();
  const query = useQuery({
    queryKey: ["hits", albumId],
    queryFn: () => getHits(albumId),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  if (!query.data || !query.data.hits) {
    return <div>No hits found for this album.</div>;
  }

  const sortedHits = query.data.hits.sort((a, b) => a.length - b.length);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Hits for Album ID: {albumId}</h1>
      <ul className="mt-4">
        {sortedHits.map((hit) => (
          <li key={hit.id} className="mb-2">
            <p className="text-xl font-semibold">{hit.title}</p>
            <p>Length: {hit.length} mins</p>
            <p>Popularity: {hit.popularityIndex}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
