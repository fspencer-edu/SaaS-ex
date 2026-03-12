const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getProjects() {
  const response = await fetch(`${API_URL}/api/projects`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  return response.json();
}