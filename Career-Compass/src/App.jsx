import { useState } from "react";
import Sidebar from "./components/Sidebar";
//import DiscoverJobs from "./components/DiscoverJobs";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const [currentPage, setCurrentPage] = useState("discover");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "user",
    email: "user@example.com",
    location: "Nairobi, Kenya",
    experienceLevel: "Junior",
    bio: "Computer Science student passionate about building accessible, performant web applications.",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Git",
      "TypeScript",
    ],
    targetRoles: ["Frontend Developer", "Software Engineer", "AI Intern"],
    jobTypes: ["Internship", "Entry level"],
    preferredLocations: ["Kenya", "Remote"],
    careerGoal: "Frontend Developer",
  });

  function handleSaveProfile(updatedProfile) {
    setProfile(updatedProfile);
    setShowEditProfile(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8ff]">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        profile={profile}
      />

      {currentPage === "discover" && <DiscoverJobs />}

      {currentPage === "profile" && (
        <Profile profile={profile} onEdit={() => setShowEditProfile(true)} />
      )}

      {showEditProfile && (
        <EditProfile
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </div>
  );
}

export default App;
