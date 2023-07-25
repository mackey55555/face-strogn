import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Score from "./components/Score";
import Ranking from "./components/Ranking";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/score" component={Score} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
