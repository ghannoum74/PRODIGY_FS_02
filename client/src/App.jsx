import "./CSS/App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainContainer from "./components/mainContainer";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <MainContainer>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
