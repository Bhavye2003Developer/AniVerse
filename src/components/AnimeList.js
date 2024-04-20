import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/UserContext";
import { get_anime_list } from "../../utils/anime";
import AnimeCard from "./AnimeCard";

const AnimeList = () => {
  const [userContext] = useContext(UserContext);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    get_anime_list("").then((animes) => {
      setAnimeList(animes);
    });
  }, []);

  useEffect(() => {
    const searched = userContext.searched;
    if (searched) {
      console.log("from list: ", searched);
      setAnimeList([]); // while fetching anime from new search
      get_anime_list(searched).then((animes) => {
        if (animes.length === 0) {
          setAnimeList(null);
          return;
        }
        setAnimeList(animes);
      });
    }
  }, [userContext.searched]);

  return (
    <div className="flex flex-wrap">
      {animeList
        ? animeList.length > 0
          ? animeList.map((anime, index) => (
              <AnimeCard {...anime} key={index} />
            ))
          : "Loading..."
        : "No anime found"}
    </div>
  );
};

export default AnimeList;
