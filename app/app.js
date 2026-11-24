const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const loadError = document.querySelector("#load-error");

const textOrFallback = (value) => (
  typeof value === "string" && value.trim() ? value : "Not provided"
);

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function createDetail(label, value, className = "") {
  const wrapper = document.createElement("div");
  wrapper.className = `project-detail ${className}`.trim();

  const heading = document.createElement("dt");
  heading.textContent = label;
  const content = document.createElement("dd");
  content.textContent = textOrFallback(value);

  wrapper.append(heading, content);
  return wrapper;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const titleGroup = document.createElement("div");
  titleGroup.className = "card-title-group";
  const title = document.createElement("h3");
  title.className = "project-name";
  title.textContent = textOrFallback(project.name);
  const owner = document.createElement("p");
  owner.className = "project-owner";
  owner.textContent = `Led by ${textOrFallback(project.owner)}`;
  titleGroup.append(title, owner);

  const status = document.createElement("span");
  status.className = `status-badge status-${slugify(textOrFallback(project.status))}`;
  status.textContent = textOrFallback(project.status);
  cardHeader.append(titleGroup, status);

  const summary = document.createElement("p");
  summary.className = "project-summary";
  summary.textContent = textOrFallback(project.summary);

  const details = document.createElement("dl");
  details.className = "project-details";
  details.append(
    createDetail("RECENT ACTIVITY", project.recentActivity, "activity-detail"),
    createDetail(
      "PRIORITY",
      project.priority,
      `priority-detail priority-${slugify(textOrFallback(project.priority))}`,
    ),
  );

  card.append(cardHeader, summary, details);
  return card;
}

async function loadProjects() {
  try {
    const response = await fetch("project-data.json");
    if (!response.ok) {
      throw new Error(`Project data request failed with status ${response.status}.`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.projects)) {
      throw new Error('Project data must contain a "projects" array.');
    }

    projectList.replaceChildren();
    if (data.projects.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "empty-message";
      emptyState.textContent = "No projects to show yet. Check back soon.";
      projectList.append(emptyState);
    } else {
      const fragment = document.createDocumentFragment();
      data.projects.forEach((project) => fragment.append(createProjectCard(project)));
      projectList.append(fragment);
    }

    const count = data.projects.length;
    projectCount.textContent = `${count} ${count === 1 ? "project" : "projects"} in view`;
  } catch (error) {
    projectList.replaceChildren();
    loadError.hidden = false;
    loadError.textContent = `Project updates could not be loaded. ${error.message}`;
    projectCount.textContent = "Project data unavailable";
  } finally {
    projectList.setAttribute("aria-busy", "false");
  }
}

loadProjects();
