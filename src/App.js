import Login from "./Containers/Manager/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Containers/Manager/Signup";
import Home from "./Containers/Manager/Home";
import Bugs from "./Containers/Manager/Bugs";
import CreProj from "./Containers/Manager/CreProj";
import Edit from "./Containers/Manager/Edit";
import Projects from "./Containers/Manager/Projects";
import EditProject from "./Containers/Manager/EditProject";
import UserBugs from "./Containers/Developer/UserBugs";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/add-bug" element={<Home />}></Route>
          <Route path="/create" element={<CreProj />}></Route>
          <Route path="/home" element={<Projects />}></Route>
          <Route path="/rel-bugs" element={<UserBugs></UserBugs>}></Route>
          <Route path="/details/:id" element={<Bugs />}></Route>
          <Route path="/edit/:bugId" element={<Edit />}></Route>
          <Route path="/edit-project/:projId" element={<EditProject />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
