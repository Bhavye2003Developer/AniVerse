import { useContext, useState } from "react";
import UserContext from "../../utils/UserContext";
import { Link, redirect } from "react-router-dom";

const Header = () => {
  const [searched, setSearched] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const handleSearch = () => {
    console.log("header: ", searched);
    setUserContext({ ...userContext, searched });
  };

  return (
    <div className="flex border border-black px-10">
      <div className="flex ml-10 py-5 w-9/12">
        <Link to={"/"}>
          <div className="font-sans text-red-500">
            <span className="cursor-pointer">AniVerse</span>
          </div>
        </Link>
        <div className="flex justify-between w-1/5 ml-20 text-lg">
          <div className="cursor-pointer">
            <span>Animes</span>
          </div>
          <div className="cursor-pointer">
            <span>Mangas</span>
          </div>
          <div className="cursor-pointer">
            <span>News</span>
          </div>
        </div>
      </div>
      <div className="flex py-2 w-96">
        <div className="border-t-2 border-b-2 border-s-2 border-black rounded-s-3xl pt-3 pl-3 w-full">
          <input
            type="text"
            value={searched}
            placeholder="Search..."
            className="text-lg p-0 outline-none w-full pr-2"
            spellCheck={false}
            onChange={(e) => setSearched(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <div className="flex border-e-2 border-t-2 border-b-2 border-black rounded-e-3xl w-10 justify-end pt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
            onClick={handleSearch}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="22" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
