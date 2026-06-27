//import { redirect } from "next/navigation";
//import { auth } from "@/auth";

const placeholderProjects = [
  { id: "1", name: "Backyard Deck" },
  { id: "2", name: "Kitchen Remodel" },
  { id: "3", name: "Garage Shelving" },
  { id: "4", name: "Bathroom Tile" },
  { id: "5", name: "Fence Installation" },
  { id: "6", name: "Patio Pergola" },
];

export default async function DashboardPage() {
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/auth/signin");
  // }

  //const userName = session.user.name ?? session.user.email ?? "Builder";

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#004990] mb-2">
        {/* Welcome, {userName} */}
      </h1>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-[#333]">
          Project Dashboard
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 bg-[#004990] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#003a73] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004990]"
          aria-label="Create a new project"
        >
          <span aria-hidden="true" className="text-lg leading-none">+</span>
          New Project
        </button>
      </div>

      <ul
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        aria-label="Your projects"
      >
        {placeholderProjects.map((project) => (
          <li key={project.id}>
            <article
              className="flex items-center justify-center min-h-40 rounded-lg border border-[#d1d5db] bg-white shadow-sm hover:shadow-md hover:border-[#004990] transition-shadow cursor-pointer p-6"
              tabIndex={0}
              aria-label={`Project: ${project.name}`}
            >
              <span className="text-lg font-semibold text-[#004990] text-center">
                {project.name}
              </span>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
