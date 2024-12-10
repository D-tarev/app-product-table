import "./App.css";
import ProductForm from "./components/ProductForm/ProductForm";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Head from "./components/Head/Head";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Head" />} />
        <Route path="Head" element={<Head />} />
        <Route path="ProductForm" element={<ProductForm isCreate={true} />} />
        <Route
          path="ProductForm/:id"
          element={<ProductForm isCreate={false} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

