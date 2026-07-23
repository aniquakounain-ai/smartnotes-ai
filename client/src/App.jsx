import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AINotes from "./pages/AINotes";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import PDFSummary from "./pages/PDFSummary";
import Settings from "./pages/Settings";
import MyNotes from "./pages/MyNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/ai-notes" element={<AINotes />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/pdf-summary" element={<PDFSummary />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-notes" element={<MyNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;