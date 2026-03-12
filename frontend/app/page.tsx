import { getProjects } from "../lib/api";

type Project = {
  id: string;
  name: string;
  status: string;
};

export default async function HomePage() {
  let projects: Project[] = [];
  let error = "";

  try {
    projects = await getProjects();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <main>
      <h1>TaskFlow Pro</h1>
      <p>Production SaaS example using Next.js, Express, PostgreSQL, Redis, Kubernetes, and AWS.</p>

      <section style={{ marginTop: 24 }}>
        <h2>Projects</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.name}</strong> — {project.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}