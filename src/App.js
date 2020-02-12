import React from "react";

import { AuthProvider } from "./hooks";

import Home from "./components/Home";

const App = () => {
  return (
    <AuthProvider strategy="finster">
      <Home />
    </AuthProvider>
  );
};

export default App;
