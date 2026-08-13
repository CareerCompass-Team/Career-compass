function Sidebar({ currentPage, setCurrentPage, profile }) {
  const menuItem = (active = false) =>
    `group flex w-full items-center gap-5 rounded-2xl px-5 py-4 text-left text-lg transition-all duration-200 ${
      active
        ? "bg-[#e4d5ff] text-[#6333dc]"
        : "text-[#506fa9] hover:bg-[#eceefa] hover:text-[#6333dc]"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-[#d9ddec] bg-[#f1f3ff]">
      {/* Logo */}
      <div className="border-b border-[#d9ddec] px-7 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[17px] bg-gradient-to-br from-[#7b3fed] to-[#6133d9] text-4xl text-white">
            ↗
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#102657]">CareerCompass</h2>

            <span className="text-sm tracking-[0.22em] text-[#7088b8]">
              FIND · GROW
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-7">
        {/* Discover */}
        <button
          type="button"
          className={menuItem(currentPage === "discover")}
          onClick={() => setCurrentPage("discover")}
        >
          <span className="text-2xl">⌕</span>

          <span className="flex-1">Discover Jobs</span>

          {currentPage === "discover" && <span className="text-xl">•</span>}
        </button>

        {/* Applications */}
        <div className="mt-9">
          <p className="mb-4 px-3 text-sm font-medium tracking-[0.16em] text-[#8aa0ce]">
            APPLICATIONS
          </p>

          <button type="button" className={menuItem(false)}>
            <span className="text-xl">▣</span>
            <span>Applications</span>
          </button>

          <button type="button" className={menuItem(false)}>
            <span className="text-xl">♪</span>
            <span>Interviews</span>
          </button>
        </div>

        {/* Documents */}
        <div className="mt-9">
          <p className="mb-4 px-3 text-sm font-medium tracking-[0.16em] text-[#8aa0ce]">
            DOCUMENTS
          </p>

          <button type="button" className={menuItem(false)}>
            <span className="text-xl">■</span>
            <span>CV Center</span>
          </button>
        </div>

        {/* Account */}
        <div className="mt-9">
          <p className="mb-4 px-3 text-sm font-medium tracking-[0.16em] text-[#8aa0ce]">
            ACCOUNT
          </p>

          <button
            type="button"
            className={menuItem(currentPage === "profile")}
            onClick={() => setCurrentPage("profile")}
          >
            <span className="text-xl">♟</span>

            <span className="flex-1">Profile</span>

            {currentPage === "profile" && <span className="text-xl">•</span>}
          </button>
        </div>
      </nav>

      {/* Bottom user section */}
      <div className="border-t border-[#d9ddec] px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7139e9] to-[#4c71eb] font-semibold text-white">
            {getInitials(profile?.fullName || "User")}
          </div>

          <div className="min-w-0">
            <strong className="block truncate text-base text-[#102657]">
              {profile?.fullName || "User"}
            </strong>

            <span className="text-sm text-[#7088b8]">
              {profile?.experienceLevel || "Student"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default Sidebar;
