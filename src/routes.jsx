import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Filmes } from "./pages/Filmes";
import { Header } from "./components/Header";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filmes />} />
      </Routes>
    </BrowserRouter>
  );
}
