const API_URL = "https://api.adzuna.com/v1/api";

export async function getJobs({
  query = "frontend developer",
  country = "za",
  page = 1,
  resultsPerPage = 20,
} = {}) {
  const appId = import.meta.env.VITE_ADZUNA_APP_ID;
  const appKey = import.meta.env.VITE_ADZUNA_APP_KEY;

  console.log("Adzuna App ID:", appId);
  console.log("Adzuna App Key exists:", !!appKey);

  if (!appId || !appKey) {
    throw new Error("Adzuna credentials are missing. Check your .env file.");
  }

  const url =
    `${API_URL}/jobs/${country}/search/${page}` +
    `?app_id=${encodeURIComponent(appId)}` +
    `&app_key=${encodeURIComponent(appKey)}` +
    `&results_per_page=${resultsPerPage}` +
    `&what=${encodeURIComponent(query)}` +
    `&content-type=application/json`;

  console.log("Adzuna URL:", url);

  const response = await fetch(url);

  const text = await response.text();

  console.log("Adzuna status:", response.status);
  console.log("Adzuna response:", text);

  if (!response.ok) {
    throw new Error(`Adzuna API returned ${response.status}: ${text}`);
  }

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Adzuna returned an invalid JSON response.");
  }

  return data.results || [];
}
