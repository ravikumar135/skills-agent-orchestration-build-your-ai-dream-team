# Agent team

## Orchestrator

- **Model:** Claude Opus 5.5 (copilot)
- **Responsibility:** Coordinates the specialist agents, turns the implementation plan into ordered phases, assigns non-overlapping file scopes, and verifies that the integrated dashboard works together. The Orchestrator does not implement code.
- **Agent file:** [orchestrator.agent.md](../.github/agents/orchestrator.agent.md)

## Planner

- **Model:** Claude Opus 5.5 (copilot)
- **Responsibility:** Researches the repository and requirements, identifies dependencies and edge cases, and produces a practical implementation plan with file assignments and validation expectations.
- **Agent file:** [planner.agent.md](../.github/agents/planner.agent.md)

## Coder

- **Model:** GPT-5.5 (copilot)
- **Responsibility:** Implements the assigned application logic and support code, keeps behavior clear and testable, validates changes, and creates runnable app configuration such as the Project Pulse launch setup when requested.
- **Agent file:** [coder.agent.md](../.github/agents/coder.agent.md)

## Designer

- **Model:** Gemini 3.7 Flash (copilot)
- **Responsibility:** Creates the dashboard's UI/UX and visual design, with accessible information hierarchy, responsive layout, clear project cards and status badges, and priority treatment.
- **Agent file:** [designer.agent.md](../.github/agents/designer.agent.md)

## Team workflow

The Orchestrator sends Mona's Project Pulse requirements to the Planner, which researches the existing app and returns an ordered plan with file assignments, dependencies, risks, and validation expectations. The Orchestrator then separates independent design and implementation work into phases, assigning each specialist a clear scope so files do not overlap.

The Designer establishes the dashboard structure and styling in the assigned UI files, while the Coder implements the required application behavior and launch configuration in separate assigned files. The Orchestrator coordinates sequential handoffs where work depends on earlier output, runs independent work in parallel, validates that the integrated result is polished and runnable, and reports progress and blockers. None of the agents stage, commit, or push changes; the learner controls Git operations.
