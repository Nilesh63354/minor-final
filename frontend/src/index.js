import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Homepage from './pages/Homepage';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Homepage />}  />
          <Route path = "/logged" element = {<Home />}>
          <Route path = "/logged/recommendation" element = {<About />} />
          <Route path = "/logged/book" element = {<BookList />} />
          <Route path = "/logged/book/:id" element = {<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

