import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
