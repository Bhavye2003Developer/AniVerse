import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_servers } from "../../utils/anime";
import ReactPlayer from "react-player";

const WatchAnime = () => {
  const { episode_id } = useParams("episode_id");
  const [servers, setServers] = useState(null);
  const [episodeServer, setEpisodeServer] = useState(null);

  useEffect(() => {
    get_servers(episode_id).then((res) => {
      console.log(res);
      setServers(res);
      setEpisodeServer(res[1]?.url);
    });
  }, [episode_id]);

  return (
    <div className="flex items-start justify-center space-x-8">
      <div className="flex flex-col space-y-4">
        {servers ? (
          servers.map((server, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-gray-700">Server: {server.name}</span>
              <button
                onClick={() => {
                  setEpisodeServer(server.url);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                CHOOSE THE SERVER
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-700">No server</span>
        )}
      </div>
      <div className="w-1/2 h-[455px] border border-gray-300 rounded-lg overflow-hidden">
        {episodeServer && (
          <iframe
            src={episodeServer}
            controls={true}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default WatchAnime;
