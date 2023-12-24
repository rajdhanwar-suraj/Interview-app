import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Quizpage from "./Pages/Quizpage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/quiz" component={Quizpage} />
    </div>
  );
}

export default App;
