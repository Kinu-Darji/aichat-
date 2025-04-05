import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";   
import { Provider } from "react-redux";
import ContextProvider from "./context/Context";
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById("root");

if (rootElement) {

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Auth0Provider
    domain="dev-mydudvlrpu30t530.us.auth0.com"
    clientId="SzHoOprxCwp3iev3SOx0J26WKgv9l5pL"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <Provider store={store}>  
        <ContextProvider>       
          <App />
        </ContextProvider>
      </Provider>
      </Auth0Provider>
  );
}

reportWebVitals();
