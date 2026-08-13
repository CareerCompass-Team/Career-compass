function Profile({ profile, onEdit }) {
  return (
    <main className="min-h-screen w-full bg-[#f7f8ff] px-5 py-8 text-[#102657] sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
      <div className="w-full">
        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102657] sm:text-4xl xl:text-5xl">
              Career Profile
            </h1>

            <p className="mt-2 text-base text-[#6077a7] sm:text-lg">
              Your profile powers job matching
            </p>
          </div>

          <button
            onClick={onEdit}
            type="button"
            className="self-start rounded-2xl border border-[#d7c7fb] bg-[#eee4ff] px-6 py-3 font-semibold text-[#6333dc] transition hover:bg-[#e5d8ff] sm:self-auto"
          >
            ✎&nbsp; Edit Profile
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-6">
            {/* PERSONAL INFORMATION */}
            <section className="w-full rounded-3xl border border-[#d8ddea] bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#7088b8]">
                PERSONAL INFORMATION
              </h3>

              <div className="mt-7 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <ProfileField label="Full Name" value={profile.fullName} />

                <ProfileField label="Email" value={profile.email} />

                <ProfileField label="Location" value={profile.location} />

                <ProfileField
                  label="Experience Level"
                  value={profile.experienceLevel}
                />
              </div>

              {/* BIO */}
              <div className="mt-7 border-t border-[#edf0f5] pt-7">
                <label className="text-base text-[#7088b8]">Bio</label>

                <p className="mt-2 break-words text-base leading-7 text-[#183467] sm:text-lg">
                  {profile.bio}
                </p>
              </div>
            </section>

            {/* SKILLS */}
            <section className="w-full rounded-3xl border border-[#d8ddea] bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#7088b8]">SKILLS</h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-[#ded1f7] bg-[#f0e8fb] px-4 py-2 text-sm font-medium text-[#6333dc] sm:text-base"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* TARGET ROLES */}
            <section className="w-full rounded-3xl border border-[#d8ddea] bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#7088b8]">TARGET ROLES</h3>

              <div className="mt-6 flex flex-wrap gap-3">
                {profile.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-xl border border-[#ded1f7] bg-[#f5f0fa] px-4 py-2 text-sm text-[#294777] sm:text-base"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="min-w-0 space-y-6">
            {/* PROFILE CARD */}
            <section className="rounded-3xl border border-[#d8ddea] bg-white p-7 text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#7139e9] to-[#4c71eb] text-4xl font-bold text-white sm:h-36 sm:w-36">
                {getInitials(profile.fullName)}
              </div>

              <h2 className="mt-6 break-words text-xl font-bold text-[#102657]">
                {profile.fullName}
              </h2>

              <p className="mt-2 break-words text-base text-[#7088b8]">
                {profile.location}
              </p>
            </section>

            {/* PREFERENCES */}
            <section className="rounded-3xl border border-[#d8ddea] bg-white p-7">
              <h3 className="text-xl font-bold text-[#7088b8]">PREFERENCES</h3>

              {/* JOB TYPES */}
              <label className="mt-6 block text-base font-medium text-[#7088b8]">
                Job Types
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {profile.jobTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-xl bg-[#f0e8fb] px-3 py-2 text-sm text-[#294777]"
                  >
                    ☑ {type}
                  </span>
                ))}
              </div>

              {/* LOCATIONS */}
              <label className="mt-6 block text-base font-medium text-[#7088b8]">
                Locations
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {profile.preferredLocations.map((location) => (
                  <span
                    key={location}
                    className="rounded-xl bg-[#f0e8fb] px-3 py-2 text-sm text-[#294777]"
                  >
                    ☑ {location}
                  </span>
                ))}
              </div>
            </section>

            {/* CAREER GOAL */}
            <section className="rounded-3xl border border-[#d8ddea] bg-white p-7">
              <h3 className="text-xl font-bold text-[#7088b8]">CAREER GOAL</h3>

              <div className="mt-5 break-words rounded-2xl border border-[#d9c9f7] bg-[#eee4ff] p-4 text-base font-semibold text-[#6333dc]">
                🎯 {profile.careerGoal}
              </div>

              <p className="mt-4 text-sm text-[#6077a7]">
                Level: {profile.experienceLevel}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /*PROFILE FIELD*/
}

function ProfileField({ label, value }) {
  return (
    <div className="min-w-0">
      <label className="block text-sm font-medium text-[#7088b8]">
        {label}
      </label>

      <p className="mt-2 break-words text-base font-medium text-[#183467] sm:text-lg">
        {value}
      </p>
    </div>
  );
}

{
  /*GET INITIALS*/
}

function getInitials(name) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default Profile;
