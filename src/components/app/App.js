import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../header/Header";
import Login from "../login/Login";
import Register from "../register/Register";
import Main from "../main/Main";
import Form from "../form/Form";
import PostPage from "../postPage/PostPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/form" element={<Form/>}></Route>
          <Route path="/posting/:id" element={<PostPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
