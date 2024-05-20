import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
