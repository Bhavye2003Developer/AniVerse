import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_anime_info } from "../../utils/anime";

const AnimeInfo = () => {
  const { name } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);

  useEffect(() => {
    get_anime_info(name).then((info) => {
      setAnimeInfo(info);
    });
  }, [name]);

  return (
    <div className="container mx-auto py-8 w-full">
      {animeInfo ? (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={animeInfo.image}
            alt={animeInfo.title}
            className="w-40 h-auto object-cover rounded-t-lg transition-opacity duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {animeInfo.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Release Date:{" "}
              <span className="font-semibold">{animeInfo.releaseDate}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Description:{" "}
              <span className="font-semibold">{animeInfo.description}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Type: <span className="font-semibold">{animeInfo.subOrDub}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Status: <span className="font-semibold">{animeInfo.status}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Total Episodes:{" "}
              <span className="font-semibold">{animeInfo.totalEpisodes}</span>
            </p>
            <div className="mt-4">
              <strong className="text-lg text-gray-800">Episodes:</strong>
              <div className="max-h-48 overflow-y-auto mt-2">
                {animeInfo.episodes.map((episode) => (
                  <Link to={`/watch/${episode.id}`}>
                    <div
                      key={episode.id}
                      className="text-sm text-gray-600 mb-1 cursor-pointer"
                    >
                      Episode {episode.id}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default AnimeInfo;
