import "./App.css";
import { Routes, Route } from "react-router-dom";
import MeetupList from "./pages/MeetupListPage";
import AddMeetup from "./components/AddMeetup";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MeetupDetails from "./pages/MeetupDetailsPage";
import EditMeetUp from "./pages/EditMeetupPage";
import ResourceList from "./pages/ResourceListPage";
import AddResource from "./components/AddResource";
import ResourceDetails from "./pages/ResourceDetailsPage";
import EditResource from "./pages/EditResourcePage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/auth/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path="/meetup" element={<MeetupList />} />
        <Route path="/meetup/create" element={<IsPrivate><AddMeetup /></IsPrivate>} />
        <Route path="/meetup/:meetupId" element={<IsPrivate><MeetupDetails /></IsPrivate>} />
        <Route path="/meetup/edit/:meetupId" element={<IsPrivate><EditMeetUp /></IsPrivate>} />
        <Route path="/resource" element={<ResourceList />} />
        <Route path="/resource/create" element={<IsPrivate><AddResource /></IsPrivate>} />
        <Route path="/resource/:resourceId" element={<IsPrivate><ResourceDetails /></IsPrivate>} />
        <Route path="/resource/edit/:resourceId" element={<IsPrivate><EditResource /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
