import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import MainLayout from "./Layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
