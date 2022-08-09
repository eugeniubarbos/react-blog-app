import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import AddNewBlog from './components/addNewBlog';
import Details from './components/details';
import Navigation from './assests/navBar'
import Login from './components/auth/login';
import Register from './components/auth/register';
function App() {
  const [data, setData] = useState("hello")

  const fetchDataFromHome = (item) => {
    console.log(item, "coming from home")
    setData(item)
  }

  return (
    <div className="container">
      <div className="row">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home fetchDataFromHome={fetchDataFromHome} />} />
            <Route path="/addNewBlog" element={<AddNewBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<Details data={data} />} />
          </Routes>

        </Router>

      </div>
    </div>

  );
}

export default App;
