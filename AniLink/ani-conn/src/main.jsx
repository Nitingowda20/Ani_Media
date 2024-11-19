// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { store, persistor } from "./redux/store.js";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import ThemeProvide from "./components/ThemeProvide.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <PersistGate persistor={persistor}>
//     <Provider store={store}>
//       <ThemeProvide>
//         <App />
//       </ThemeProvide>
//     </Provider>
//   </PersistGate>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import ThemeProvide from "./components/ThemeProvide.jsx"; // Assuming this is your theme context provider for dark mode

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvide>
            <App />
          </ThemeProvide>
        </Provider>
      </PersistGate>
    </ChakraProvider>
  </React.StrictMode>
);
