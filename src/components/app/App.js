import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../header/Header";
import Login from "../login/Login";
import Register from "../register/Register";
import Main from "../main/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Main/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
