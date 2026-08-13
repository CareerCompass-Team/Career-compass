function JobCard({ job }) {
  const company = job.company?.display_name || "Unknown Company";

  const location = job.location?.display_name || "Location not specified";

  const salary =
    job.salary_min || job.salary_max
      ? `KES ${job.salary_min || ""} - ${job.salary_max || ""}`
      : "Salary not specified";

  return (
    <article className="group flex min-h-[390px] flex-col rounded-[24px] border border-[#d8ddea] bg-white p-8 shadow-[0_2px_10px_rgba(35,50,90,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(70,55,150,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[18px] bg-[#efe4ff] text-3xl font-semibold text-[#6333dc]">
          {company.charAt(0).toUpperCase()}
        </div>

        <span className="rounded-2xl bg-[#e2f8f1] px-5 py-3 font-mono text-base font-medium text-[#00a77b]">
          85% match
        </span>
      </div>

      <h2 className="mt-7 text-2xl font-bold leading-tight text-[#102657]">
        {job.title}
      </h2>

      <p className="mt-4 text-xl text-[#6077a7]">{company}</p>

      <div className="mt-7 space-y-2 text-[17px] text-[#102657]">
        <span className="block">
          📍 <span className="ml-1">{location}</span>
        </span>
        <span className="block">
          💼 <span className="ml-1">{job.contract_type || "Job"}</span>
        </span>
      </div>

      <div className="mt-2 text-[17px] text-[#6077a7]">
        💰 <span className="ml-1">{salary}</span>
      </div>

      <div className="mt-5">
        <span className="inline-flex rounded-xl bg-[#f1eafd] px-4 py-2 text-sm font-medium text-[#6333dc]">
          {job.category?.label || "Technology"}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#edf0f5] pt-5">
        <span className="text-sm text-[#7b8caf]">
          Posted{" "}
          {job.created
            ? new Date(job.created).toLocaleDateString()
            : "recently"}
        </span>

        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#6333dc] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5225c7] focus:outline-none focus:ring-4 focus:ring-[#6333dc]/20"
        >
          Apply
        </a>
      </div>
    </article>
  );
}

export default JobCard;
