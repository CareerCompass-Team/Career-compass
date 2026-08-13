import { useState } from "react";

function EditProfile({ profile, onSave, onCancel }) {
  const [form, setForm] = useState({
    ...profile,
    skills: profile.skills?.join(", ") || "",
    targetRoles: profile.targetRoles?.join(", ") || "",
    jobTypes: profile.jobTypes?.join(", ") || "",
    preferredLocations: profile.preferredLocations?.join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...form,

      skills: form.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      targetRoles: form.targetRoles
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      jobTypes: form.jobTypes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      preferredLocations: form.preferredLocations
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSave(updatedProfile);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl">
        // HEADER
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-[#102657]">Edit Profile</h2>

            <p className="mt-2 text-gray-500">
              Update your profile information
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-500 hover:bg-gray-200"
          >
            ×
          </button>
        </div>
        {/*FORM*/}
        <form onSubmit={handleSubmit}>
          {/*PERSONAL INFORMATION*/}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/*FULL NAME*/}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-600"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName || ""}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
            {/*EMAIL*/}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
            {/*LOCATION*/}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-600"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location || ""}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
            {/*EXPERIENCE*/}
            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold text-gray-600"
              >
                Experience Level
              </label>

              <select
                id="experienceLevel"
                name="experienceLevel"
                value={form.experienceLevel || ""}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <option value="Student">Student</option>
                <option value="Entry level">Entry level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
          {/*BIO*/}
          <div className="mt-6">
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-gray-600"
            >
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              rows="4"
              className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
          {/*SKILLS*/}
          <div className="mt-6">
            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-gray-600"
            >
              Skills
            </label>

            <input
              id="skills"
              name="skills"
              type="text"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, JavaScript, CSS"
              className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <p className="mt-1 text-xs text-gray-500">
              Separate skills with commas
            </p>
          </div>
          {/*TARGET ROLES*/}
          <div className="mt-6">
            <label
              htmlFor="targetRoles"
              className="block text-sm font-semibold text-gray-600"
            >
              Target Roles
            </label>

            <input
              id="targetRoles"
              name="targetRoles"
              type="text"
              value={form.targetRoles}
              onChange={handleChange}
              placeholder="Frontend Developer, Software Engineer"
              className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <p className="mt-1 text-xs text-gray-500">
              Separate roles with commas
            </p>
          </div>
          {/*JOB TYPES / LOCATIONS*/}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="jobTypes"
                className="block text-sm font-semibold text-gray-600"
              >
                Job Types
              </label>

              <input
                id="jobTypes"
                name="jobTypes"
                type="text"
                value={form.jobTypes}
                onChange={handleChange}
                placeholder="Internship, Entry level"
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />

              <p className="mt-1 text-xs text-gray-500">
                Separate job types with commas
              </p>
            </div>

            <div>
              <label
                htmlFor="preferredLocations"
                className="block text-sm font-semibold text-gray-600"
              >
                Preferred Locations
              </label>

              <input
                id="preferredLocations"
                name="preferredLocations"
                type="text"
                value={form.preferredLocations}
                onChange={handleChange}
                placeholder="Kenya, Remote"
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />

              <p className="mt-1 text-xs text-gray-500">
                Separate locations with commas
              </p>
            </div>
          </div>
          {/*CAREER GOAL*/}
          <div className="mt-6">
            <label
              htmlFor="careerGoal"
              className="block text-sm font-semibold text-gray-600"
            >
              Career Goal
            </label>

            <input
              id="careerGoal"
              name="careerGoal"
              type="text"
              value={form.careerGoal || ""}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
          {/*BUTTONS*/}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-gray-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border-2 border-gray-300 px-7 py-3 font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#6333dc] px-7 py-3 font-semibold text-white shadow-lg hover:bg-[#5225c7]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
