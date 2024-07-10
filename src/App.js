import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "./App.css"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import Signup from "./screens/Signup.jsx";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./screens/MyOrder.js";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/createUser" element={<Signup></Signup>}></Route>
          <Route exact path="/myOrder" element={<MyOrder></MyOrder>}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
