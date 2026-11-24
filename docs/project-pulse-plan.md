# Project Pulse implementation plan

## Goal

Create Mona's lightweight Project Pulse dashboard as a small static app that helps contributors quickly understand project ownership, status, recent activity, priority or risk, and summaries. The result should use the custom agent team in `.github/agents/` and remain easy to preview from VS Code.

## Implementation phases

### Phase 1: Define the dashboard structure and data

1. The Designer creates the content hierarchy and accessibility direction for `app/index.html`, then confirms the user-visible fields and responsive layout.
2. The Coder creates `app/project-data.json` with a top-level `projects` array. Each project must include `name`, `owner`, `status`, `recentActivity`, and `priority`.
3. The Coder creates the initial `app/index.html` structure and loads both `styles.css` and `project-data.json`.

The structure and data should be agreed before implementation begins because `app/index.html` will render the project objects from `app/project-data.json`.

### Phase 2: Implement the polished frontend

1. The Designer owns the visual and accessibility decisions for `app/index.html` and `app/styles.css`.
   - Use a clear **Project Pulse** title.
   - Present visible project cards with readable project names, owners, statuses, recent activity, and priorities.
   - Use status badges, clear priority treatment, sufficient contrast, semantic markup, keyboard-friendly structure, and a responsive layout.
   - Use `.dashboard` and `.project-card` CSS hooks.
   - Use `border-radius`, `box-shadow`, readable spacing, and a consistent visual hierarchy.
2. The Coder implements the markup, data loading, project-card rendering, and any client-side behavior needed for the static app.
   - Give each rendered card the `project-card` class.
   - Show `status`, `recentActivity`, and `priority` for every project.
   - Keep `app/index.html` focused on markup and behavior and `app/styles.css` focused on presentation.

The Designer and Coder should complete `app/index.html` and `app/styles.css` in coordinated passes. Their file ownership must avoid overlapping edits during the same phase.

### Phase 3: Add the VS Code launch configuration

The Coder creates `.vscode/launch.json` as strict JSON with no comments. Add a launch configuration named **Run Project Pulse Dashboard** that:

- Runs `python3 -m http.server 5500`.
- Uses `app/` as the working directory.
- Includes `serverReadyAction`.
- Opens `http://localhost:%s/index.html` so the dashboard opens instead of a directory listing.

This phase depends on `app/index.html` existing at `app/index.html`, although launch configuration can be drafted after the app structure is confirmed.

### Phase 4: Integrate and validate

The Orchestrator verifies that the app files and launch configuration integrate, reports any blockers, and confirms that the final dashboard opens correctly.

## File assignments

| File | Agent responsible | Responsibility |
| --- | --- | --- |
| `app/index.html` | Coder, with Designer guidance | Create semantic dashboard markup and render visible project cards from the data. |
| `app/styles.css` | Designer, with Coder integration | Create the polished, accessible, responsive visual system and card styling. |
| `app/project-data.json` | Coder | Store project records under a top-level `projects` key using the required fields. |
| `.vscode/launch.json` | Coder | Configure deterministic VS Code preview of `app/index.html`. |

## Designer responsibilities

- Establish the dashboard's information hierarchy and visual direction.
- Make status and priority information easy to scan.
- Ensure readable spacing, responsive behavior, accessible contrast, and semantic structure.
- Provide `.dashboard` and `.project-card` styling with polished affordances.
- Explain significant design tradeoffs and report validation recommendations.

## Coder responsibilities

- Implement the static dashboard in `app/index.html`.
- Load or reference `app/project-data.json` and render project cards.
- Preserve exact required UI names and CSS hooks.
- Create `app/project-data.json` with valid JSON.
- Create strict, comment-free `.vscode/launch.json`.
- Run local syntax and behavior checks and report remaining risks.

## Dependencies

1. `app/project-data.json` must establish the project field names before `app/index.html` renders them.
2. `app/index.html` must link to `app/styles.css`.
3. `app/index.html` must load or reference `app/project-data.json`.
4. Project-card markup must exist before responsive and card-specific styling can be fully validated.
5. `.vscode/launch.json` depends on the app directory and `app/index.html` being in place.
6. Final integration depends on all three app files and `.vscode/launch.json` being complete.

## Parallel work decisions

- **Parallel:** The Designer can define layout, accessibility, and styling requirements while the Coder defines the JSON data shape and static file structure, because these are separate decisions with no overlapping file edits.
- **Parallel:** Once the data contract and markup structure are stable, documentation-like design guidance and launch configuration drafting can proceed independently of code review.
- **Sequential:** The Coder should avoid finalizing card rendering until the JSON fields in `app/project-data.json` are settled.
- **Sequential:** The Designer should complete the required CSS hooks and visual direction before the Coder performs final UI integration if both agents would otherwise edit the same markup or stylesheet.
- **Sequential:** `.vscode/launch.json` should be added after `app/index.html` exists.
- **Sequential:** The Orchestrator performs final integration only after design, coding, data, and launch work are complete.

## Edge cases and risks

- The JSON must be valid and contain at least enough representative projects to demonstrate the dashboard.
- Missing or malformed fields should not prevent the rest of the dashboard from rendering; the Coder should handle absent optional display values explicitly or ensure data completeness.
- Status badges and priority labels need consistent, readable styling.
- The layout must remain usable on narrow screens and should not require horizontal scrolling.
- The launch server must serve `app/` and open `index.html`, not the repository root or a directory listing.
- Launch JSON must contain no comments and must parse successfully.

## Validation expectations

- Verify `app/index.html` exists and contains the exact title **Project Pulse**.
- Verify `app/index.html` references `styles.css` and loads or references `project-data.json`.
- Verify `app/index.html` renders visible project cards using the `project-card` class and displays `status`, `recentActivity`, and `priority`.
- Verify `app/styles.css` contains `.dashboard` and `.project-card`, plus `border-radius`, `box-shadow`, and responsive CSS.
- Parse `app/project-data.json` as JSON and verify a top-level `projects` array.
- Verify every project contains `name`, `owner`, `status`, `recentActivity`, and `priority`.
- Parse `.vscode/launch.json` as strict JSON and verify the name **Run Project Pulse Dashboard**.
- Verify the launch uses `python3 -m http.server 5500`, serves from `app/`, and opens `http://localhost:%s/index.html`.
- Serve the app locally and confirm the browser shows the dashboard frontend rather than a directory listing.
