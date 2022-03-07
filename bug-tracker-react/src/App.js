import React, { useState } from "react";
import Header from "./components/header";
import NewBug from "./components/NewBugComponent/newBug";
import BugList from "./components/BugList/bugList";

function App() {
  // used to trigger GET request--get list of bugs from server
  const [postToggle, setPostToggle] = useState(false);

  // toggle function for changing the state and executing the GET request
  function togglePostToggle() {
    if (postToggle) {
      setPostToggle(false);
    } else {
      setPostToggle(true);
    }
  }

  // main app
  return (
    <div>
      <Header />
      <NewBug togglePostToggle={togglePostToggle} />
      <BugList postToggle={postToggle} togglePostToggle={togglePostToggle} />
    </div>
  );
}

export default App;
