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
      setEpisodeServer(res[1].url);
    });
  }, [episode_id]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="w-96 h-48 border border-gray-300 rounded-lg overflow-hidden">
        {/* <ReactPlayer
          url={episodeServer}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
        /> */}
        <iframe width="100%" height="100%" src={episodeServer} />
      </div>
      <div className="space-y-4">
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
    </div>
  );
};

export default WatchAnime;
