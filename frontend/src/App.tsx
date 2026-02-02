import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
// import Login from "./components/login";
// import Callback from "./components/callback";
// import Portals from "./components/portals";
// import Projects from "./components/projects";
// import ProjectTasks from "./components/tasks";
// import axios from "axios";
// import { useLocalStorage } from "./hooks/useLocalstorage";
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
// import Signup from "./pages/signup";
import Admin from './pages/admin';
import Gallery from './pages/admin/screenshots';
import Nav from './components/nav';
import ProtectedRoute from './protected-route';
function App() {
  return (
    <div className="bg-white App text-slate-500 dark:text-slate-400 dark:bg-slate-900 min-h-[100vh]">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup/>}/> */}
        {/* <Route path="/" element={<Admin/>}/>
                <Route path="/:userId/gallery" element={<Gallery/>}/> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Nav />
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username/gallery"
          element={
            <ProtectedRoute>
              <Nav />
              <Gallery />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/"      element={<Admin/>}/> */}
        {/* <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/projects" element={<Portals />} />
                <Route path="/portals/:boardID/tasks" element={<ProjectTasks />} />
                <Route path=":portalId/projects" element={<Projects />} /> */}
        {/* <Route path="/portals/:portalId/projects/:projectId/tasks" element={<ProjectTasks />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
