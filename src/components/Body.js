import { useContext, useEffect } from "react";
import UserContext from "../../utils/UserContext";

const Body = () => {
  const [userContext] = useContext(UserContext);

  useEffect(() => {
    const searched = userContext.searched;
    if (searched) {
      // fetch anime
    }
  }, [userContext.searched]);

  return (
    <div>
      <h1>Body</h1>
    </div>
  );
};

export default Body;
