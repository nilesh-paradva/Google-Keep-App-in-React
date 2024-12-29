import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Archives from './pages/Archives';
import Trash from './pages/Trash';
import EditNotes from './pages/EditNotes';
import CreateNotes from './pages/CreateNotes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Notes />} />
            <Route path="notes" element={<Notes />} />
            <Route path="editnotes/:id" element={<EditNotes />} />
            <Route path="createnotes" element={<CreateNotes />} />
            <Route path="archives" element={<Archives />} />
            <Route path="trash" element={<Trash />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
