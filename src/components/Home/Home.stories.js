import React from "react";
import Home from "./Home";
import ApiDoc from "./Home.md";

export default {
  component: Home,
  title: "Home",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Home />;
