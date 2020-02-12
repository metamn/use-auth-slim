import React from "react";

import { AuthProvider } from "./hooks";

const App = () => {
  return <AuthProvider strategy="finster">"App"</AuthProvider>;
};

export default App;
