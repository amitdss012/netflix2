// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./context/AuthContext.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <BrowserRouter>
//       <AuthContextProvider>
//         <App />
//       </AuthContextProvider>
//     </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";



ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthContextProvider>
      <Provider store={store}>
        <App />
    </Provider>
      </AuthContextProvider>
    </BrowserRouter>
);

