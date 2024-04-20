import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import AnimeList from "./components/AnimeList";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import AnimeInfo from "./components/AnimeInfo";
import WatchAnime from "./components/WatchAnime";

const App = () => {
  const [userContext, setUserContext] = useState(useContext(UserContext));

  return (
    <div>
      <UserContext.Provider value={[userContext, setUserContext]}>
        <Header />
        <Body>
          <Outlet />
        </Body>
      </UserContext.Provider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AnimeList />,
      },
      {
        path: "/anime/:name",
        element: <AnimeInfo />,
      },
      {
        path: "/watch/:episode_id",
        element: <WatchAnime />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
