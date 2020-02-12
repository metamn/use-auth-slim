import React from "react";

import { AuthProvider } from "./hooks";

const App = () => {
  return <AuthProvider strategy="none">"App"</AuthProvider>;
};

export default App;
