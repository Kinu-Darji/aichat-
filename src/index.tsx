import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";   
import { Provider } from "react-redux";
import ContextProvider from "./context/Context";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>  
        <ContextProvider>       
          <App />
        </ContextProvider>
      </Provider>
    </React.StrictMode>
  );
}

reportWebVitals();
