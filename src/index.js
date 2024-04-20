import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import Home from "./components/Home";
import Body from "./components/Body";

const App = () => {
  const [userContext, setUserContext] = useState(useContext(UserContext));

  return (
    <div>
      <UserContext.Provider value={[userContext, setUserContext]}>
        <Header />
        <Body />
      </UserContext.Provider>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
