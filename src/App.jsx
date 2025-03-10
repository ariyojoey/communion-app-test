import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import "./styles/index.css";

const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
