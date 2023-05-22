import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateIssuePage from "./components/CreateIssuePage";
import CreateProject from "./components/CreateProject";

import Navbar from "./components/Navbar";
import ProjectDetailPage from "./components/ProjectDetailsPage";
import ProjectList from "./components/ProjectList";

const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/create-project" element={<CreateProject />} />

      <Route path="/:projectid/create-issue" element={<CreateIssuePage />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
  </div>
  );
};

export default App;

//2IBOFVIGGXSTjsFR
