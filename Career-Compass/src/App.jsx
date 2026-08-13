import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const [currentPage, setCurrentPage] = useState("profile");
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
      {/* SIDEBAR */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        profile={profile}
      />

      {/* MAIN CONTENT */}
      <main className="ml-[280px] min-h-screen">
        {/* PROFILE */}
        {currentPage === "profile" && (
          <Profile profile={profile} onEdit={() => setShowEditProfile(true)} />
        )}

        {/* APPLICATIONS */}
        {currentPage === "applications" && <ApplicationsPage />}

        {/* INTERVIEWS */}
        {currentPage === "interviews" && <InterviewsPage />}

        {/* CV CENTER */}
        {currentPage === "cv" && <CVCenterPage />}

        {/* DISCOVER JOBS */}
        {currentPage === "discover" && (
          <EmptyPage
            title="Discover Jobs"
            description="The Discover Jobs page has been removed."
          />
        )}
      </main>

      {/* EDIT PROFILE MODAL */}
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

/* ================================
   APPLICATIONS PAGE
================================ */

function ApplicationsPage() {
  return (
    <section className="min-h-screen p-8 md:p-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a9abd]">
          CareerCompass
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#102657]">Applications</h1>

        <p className="mt-2 text-[#7088b8]">
          Track the jobs you have applied for.
        </p>
      </div>

      <div className="rounded-3xl border border-[#d9ddec] bg-white p-10 shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#eee7ff] text-3xl text-[#6333dc]">
            📄
          </div>

          <h2 className="text-2xl font-bold text-[#102657]">
            No applications yet
          </h2>

          <p className="mt-3 text-[#7088b8]">
            Your job applications will appear here once you start applying for
            positions.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================
   INTERVIEWS PAGE
================================ */

function InterviewsPage() {
  return (
    <section className="min-h-screen p-8 md:p-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a9abd]">
          CareerCompass
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#102657]">Interviews</h1>

        <p className="mt-2 text-[#7088b8]">
          Keep track of your upcoming interviews.
        </p>
      </div>

      <div className="rounded-3xl border border-[#d9ddec] bg-white p-10 shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#eee7ff] text-3xl text-[#6333dc]">
            📅
          </div>

          <h2 className="text-2xl font-bold text-[#102657]">
            No interviews scheduled
          </h2>

          <p className="mt-3 text-[#7088b8]">
            Your upcoming interviews and interview history will appear here.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================
   CV CENTER
================================ */

function CVCenterPage() {
  return (
    <section className="min-h-screen p-8 md:p-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a9abd]">
          CareerCompass
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#102657]">CV Center</h1>

        <p className="mt-2 text-[#7088b8]">
          Create and manage your CV documents.
        </p>
      </div>

      <div className="rounded-3xl border border-[#d9ddec] bg-white p-10 shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#eee7ff] text-3xl text-[#6333dc]">
            📑
          </div>

          <h2 className="text-2xl font-bold text-[#102657]">CV Center</h2>

          <p className="mt-3 text-[#7088b8]">
            Your CV tools and documents will appear here.
          </p>

          <button
            type="button"
            className="mt-6 rounded-xl bg-[#6333dc] px-6 py-3 font-semibold text-white shadow-lg shadow-violet-300/30 transition hover:bg-[#5225c7]"
          >
            Create CV
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================
   EMPTY PAGE
================================ */

function EmptyPage({ title, description }) {
  return (
    <section className="min-h-screen p-8 md:p-12">
      <h1 className="text-4xl font-bold text-[#102657]">{title}</h1>

      <p className="mt-3 text-[#7088b8]">{description}</p>
    </section>
  );
}

export default App;
