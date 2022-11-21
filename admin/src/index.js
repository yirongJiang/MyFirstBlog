import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>);
