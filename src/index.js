import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ChakraProvider>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </>
);
