import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import MoviePage from "./pages/MoviePage";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import SeriesPage from "./pages/SeriesPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage />}></Route>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/signup"} element={<SignUpPage />}></Route>
        <Route path={"/app/*"} element={
            <PrivateRoute>
                <FeedPage />
            </PrivateRoute>
        } />
        <Route path="/movie/:id" element={<MoviePage />}></Route>
        <Route path="/tv/:seriesId" element={<SeriesPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
