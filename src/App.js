import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
