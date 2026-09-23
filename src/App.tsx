import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/auth/Loading";
import Login from "./pages/auth/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import MyTasks from "./pages/student/MyTasks";
import DailyActivity from "./pages/student/DailyActivity";
import Progress from "./pages/student/Progress";
import Project from "./pages/student/Project";
import Profile from "./pages/student/Profile";

import MentorDashboard from "./pages/mentor/MentorDashboard";
import MyStudents from "./pages/mentor/MyStudents";
import TaskManagement from "./pages/mentor/TaskManagement";
import ActivityReviews from "./pages/mentor/ActivityReviews";
import StudentProgress from "./pages/mentor/StudentProgress";
import WorkMemos from "./pages/mentor/WorkMemos";
import MentorProfile from "./pages/mentor/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import StudentDetails from "./pages/admin/StudentDetails";
import Mentors from "./pages/admin/Mentors";
import Projects from "./pages/admin/Projects";
import AdminWorkMemos from "./pages/admin/WorkMemos";
import AdminProgress from "./pages/admin/Progress";
import Notifications from "./pages/admin/Notifications";
import Settings from "./pages/admin/Settings";

import FileUploads from "./pages/common/FileUploads";
import CalendarPage from "./pages/common/CalendarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Loading Screen */}
        <Route path="/" element={<Loading />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/calendar" element={<CalendarPage />} />
        <Route path="/student/files" element={<FileUploads />} />
        <Route path="/student/tasks" element={<MyTasks />} />
        <Route path="/student/activity" element={<DailyActivity />} />
        <Route path="/student/progress" element={<Progress />} />
        <Route path="/student/project" element={<Project />} />
        <Route path="/student/profile" element={<Profile />} />

        {/* Mentor Routes */}
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/mentor/calendar" element={<CalendarPage />} />
        <Route path="/mentor/files" element={<FileUploads />} />
        <Route path="/mentor/students" element={<MyStudents />} />
        <Route path="/mentor/tasks" element={<TaskManagement />} />
        <Route path="/mentor/reviews" element={<ActivityReviews />} />
        <Route path="/mentor/progress" element={<StudentProgress />} />
        <Route path="/mentor/memos" element={<WorkMemos />} />
        <Route path="/mentor/profile" element={<MentorProfile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/calendar" element={<CalendarPage />} />
        <Route path="/admin/files" element={<FileUploads />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/students/:id" element={<StudentDetails />} />
        <Route path="/admin/mentors" element={<Mentors />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/memos" element={<AdminWorkMemos />} />
        <Route path="/admin/progress" element={<AdminProgress />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
