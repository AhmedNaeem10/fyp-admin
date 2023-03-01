import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Faculty from "./pages/Faculty";
import Timetable from "./pages/Timetable";
import Summary from "./pages/Summary";
import Upload from "./pages/Upload";
import { ToastContainer } from "react-toastify";
import Error from "./pages/Error";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
