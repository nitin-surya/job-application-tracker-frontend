import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global styles
import App from "./App"; // Main app component
import reportWebVitals from "./reportWebVitals"; // Performance measurement
import { Provider } from "react-redux";
import rootReducer from "./redux/RootReducer"; // Combined reducers
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Middleware for async actions
import { createLogger } from "redux-logger"; // Middleware for logging actions
import { BrowserRouter as Router } from "react-router-dom"; // Import Router for routing

// Create a logger middleware instance
const logger = createLogger();

// Create Redux store with thunk and logger middleware
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// Render the app component into the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// Measure performance in the app and log results or send to an analytics endpoint
reportWebVitals();
