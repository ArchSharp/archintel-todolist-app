import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoApp from "./TodoApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
