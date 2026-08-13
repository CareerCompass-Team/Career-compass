function Profile({ profile, onEdit }) {
  return (
    <main className="min-h-screen bg-[#f7f8ff] px-5 py-8 text-[#102657] sm:px-8 lg:ml-[280px] lg:px-12 lg:py-10 xl:px-14">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#102657] sm:text-5xl">
              Career Profile
            </h1>
            <p className="mt-3 text-xl text-[#6077a7]">
              Your profile powers job matching
            </p>
          </div>

          <button
            className="self-start rounded-2xl border border-[#d7c7fb] bg-[#eee4ff] px-7 py-4 text-lg font-medium text-[#6333dc] transition hover:bg-[#e5d8ff] sm:self-auto"
            onClick={onEdit}
          >
            ✎&nbsp; Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-7">
            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-[#7088b8]">
                PERSONAL INFORMATION
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <ProfileField label="Full Name" value={profile.fullName} />
                <ProfileField label="Email" value={profile.email} />
                <ProfileField label="Location" value={profile.location} />
                <ProfileField
                  label="Experience Level"
                  value={profile.experienceLevel}
                />
              </div>

              <div className="mt-8">
                <label className="text-lg text-[#7088b8]">Bio</label>
                <p className="mt-2 max-w-4xl text-xl leading-loose text-[#183467]">
                  {profile.bio}
                </p>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-[#7088b8]">SKILLS</h3>

              <div className="mt-8 flex flex-wrap gap-3.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-2xl border border-[#ded1f7] bg-[#f0e8fb] px-6 py-3 text-lg text-[#6333dc]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-[#7088b8]">
                TARGET ROLES
              </h3>

              <div className="mt-8 flex flex-wrap gap-3.5">
                {profile.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-2xl border border-[#ded1f7] bg-[#f5f0fa] px-6 py-3 text-xl text-[#294777]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-7">
            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8 text-center">
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[#7139e9] to-[#4c71eb] text-5xl font-bold text-white">
                {getInitials(profile.fullName)}
              </div>

              <h2 className="mt-8 text-2xl font-bold text-[#102657]">
                {profile.fullName}
              </h2>

              <p className="mt-3 text-xl text-[#7088b8]">{profile.location}</p>
            </section>

            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8">
              <h3 className="text-2xl font-bold text-[#7088b8]">PREFERENCES</h3>

              <label className="mt-7 block text-lg text-[#7088b8]">
                Job Types
              </label>

              <div className="mt-3 flex flex-col gap-3">
                {profile.jobTypes.map((type) => (
                  <span
                    key={type}
                    className="w-fit rounded-xl bg-[#f0e8fb] px-4 py-2.5 font-mono text-base text-[#294777]"
                  >
                    ☑ {type}
                  </span>
                ))}
              </div>

              <label className="mt-7 block text-lg text-[#7088b8]">
                Locations
              </label>

              <div className="mt-3 flex flex-col gap-3">
                {profile.preferredLocations.map((location) => (
                  <span
                    key={location}
                    className="w-fit rounded-xl bg-[#f0e8fb] px-4 py-2.5 font-mono text-base text-[#294777]"
                  >
                    ☑ {location}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#d8ddea] bg-white p-8">
              <h3 className="text-2xl font-bold text-[#7088b8]">CAREER GOAL</h3>

              <div className="mt-7 rounded-2xl border border-[#d9c9f7] bg-[#eee4ff] p-5 text-xl font-medium text-[#6333dc]">
                🎯 {profile.careerGoal}
              </div>

              <p className="mt-5 text-lg text-[#6077a7]">
                Level: {profile.experienceLevel}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="text-lg text-[#7088b8]">{label}</label>
      <p className="mt-2 text-2xl text-[#183467]">{value}</p>
    </div>
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

export default Profile;
