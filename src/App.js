//import logo from './logo.svg';

//import NavBar from './Containers/NavBar';
import Login from "./Containers/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Containers/Signup";
import Home from "./Containers/Home";
import Bugs from "./Containers/Bugs";
import CreProj from "./Containers/CreProj";
import Edit from "./Containers/Edit";
import Projects from "./Containers/Projects";

function App() {
  return (
    <div>
      {/* <NavBar></NavBar> */}

      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/add-bug" element={<Home />}></Route>
          <Route path="/create" element={<CreProj />}></Route>
          <Route path="/home" element={<Projects />}></Route>
          <Route path="/details/:id" element={<Bugs />}></Route>
          <Route path="/edit/:bugId" element={<Edit />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
