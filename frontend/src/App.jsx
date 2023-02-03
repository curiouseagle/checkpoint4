import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Navbar from "./components/Navbar";
import "./index.css";
import WishList from "./pages/WishList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="books" element={<Books />} />
          <Route path="wishlist/:id" element={<WishList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
