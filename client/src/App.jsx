import "./CSS/App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
