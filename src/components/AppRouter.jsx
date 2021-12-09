import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "../pages/Create";
import Dashboard from "../pages/Dashboard";

import HomePage from "../pages/HomePage";
import NotfoundPage from "../pages/NotfoundPage";
import Print from "../pages/Print";
import SubjectConfirm from "../pages/SubjectConfirm";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/subjectConfirm" element={<SubjectConfirm />} />
          <Route exact path="/print/:id/:sem" element={<Print />} />
          <Route exact path="*" element={<NotfoundPage />} />
        </Routes>
      </Router>
    </>
  );
}
