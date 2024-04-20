import { Link } from "react-router-dom";

const AnimeCard = ({ anime_name, anime_link, img_link, relased_date }) => {
  let anime_dashed_name = anime_link.split("/")[2];
  if (!anime_dashed_name) {
    anime_dashed_name = anime_link
      .split("episode")[0]
      .slice(1, anime_link.split("episode")[0].length - 1);
  }

  return (
    <Link to={`/anime/${anime_dashed_name}`}>
      <div className="m-10 cursor-pointer border rounded-xl">
        <div>
          <img
            src={img_link}
            alt={anime_name}
            className="w-44 h-60 rounded-t-xl"
          />
        </div>
        <div>
          {anime_name.length > 15
            ? `${anime_name.slice(0, 15)}...`
            : anime_name}
        </div>
        <div>{relased_date}</div>
      </div>
    </Link>
  );
};

export default AnimeCard;
