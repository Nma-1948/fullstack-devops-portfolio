import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";
import ProjectDetail from "./ProjectDetail";
import projects from "../data/projects";

function renderProjectDetail(slug) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProjectDetail", () => {
  test("renders the project details for a valid slug", () => {
    const project = projects[0];

    renderProjectDetail(project.slug);

    expect(
      screen.getByRole("heading", { name: project.title })
    ).toBeInTheDocument();

    expect(screen.getByText(project.description)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Technologies" })
    ).toBeInTheDocument();

    project.tech.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  test("renders optional project sections when project data provides them", () => {
    const project = projects.find(
      (item) =>
        item.overview ||
        item.features?.length > 0 ||
        item.engineeringFocus?.length > 0
    );

    expect(project).toBeDefined();

    renderProjectDetail(project.slug);

    if (project.overview) {
      expect(
        screen.getByRole("heading", { name: "Project Overview" })
      ).toBeInTheDocument();

      expect(screen.getByText(project.overview)).toBeInTheDocument();
    }

    if (project.features?.length > 0) {
      expect(
        screen.getByRole("heading", { name: "Key Features" })
      ).toBeInTheDocument();

      project.features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    }

    if (project.engineeringFocus?.length > 0) {
      expect(
        screen.getByRole("heading", { name: "Engineering Focus" })
      ).toBeInTheDocument();

      project.engineeringFocus.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    }
  });

  test("does not render GitHub or demo links when URLs are placeholders", () => {
    const project = projects[0];

    renderProjectDetail(project.slug);

    expect(
      screen.queryByRole("link", { name: /View GitHub/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: /Live Demo/i })
    ).not.toBeInTheDocument();
  });

  test("renders Project Not Found for an invalid slug", () => {
    renderProjectDetail("this-project-does-not-exist");

    expect(
      screen.getByRole("heading", { name: "Project Not Found" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "The project you are looking for does not exist."
      )
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", {
      name: /Back to Projects/i,
    });

    expect(backLink).toHaveAttribute("href", "/projects");
  });

  test("provides a back-to-projects link for a valid project", () => {
    const project = projects[0];

    renderProjectDetail(project.slug);

    const backLink = screen.getByRole("link", {
      name: /Back to Projects/i,
    });

    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
