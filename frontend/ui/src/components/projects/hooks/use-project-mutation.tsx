import { useMutation } from "@tanstack/react-query";

import { throwError, useOrganizationStore } from "@incmix/store";
import { PROJECTS_API_URL } from "@utils/constants";
import { Project } from "../types";

export function useProjectMutation() {
  const { selectedOrganisation } = useOrganizationStore();

  return useMutation({
    mutationFn: async (project: Project) => {
      if (!selectedOrganisation) {
        throw new Error("No organisation selected");
      }
      const formData = new FormData();
      formData.append("name", project.name || "");
      formData.append("orgId", selectedOrganisation.id);
      formData.append("description", project.description || "");
      formData.append("status", project.status || "");
      if (project.startDate) {
        formData.append("startDate", new Date(project.startDate).toISOString());
      }
      if (project.endDate) {
        formData.append("endDate", new Date(project.endDate).toISOString());
      }
      formData.append("budget", project.budget != null ? String(project.budget) : "");
      formData.append("company", project.company || "");
      // If project.logo is a File or Blob, append it; otherwise, append empty string
      if (project.fileData instanceof File) {
        formData.append("logo", project.fileData);
      }
      if (project.logo) {
        formData.append("logoUrl", project.logo);
      }
      // members as comma-separated string
      if (Array.isArray(project.members)) {
        formData.append("members", JSON.stringify(project.members.map((member) => ({
          id: member.id,
          role: member.position,
        }))));
      }
      // ... rest of the FormData construction logic

      const response = await fetch(PROJECTS_API_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throwError(response);
      }

      return response.json();
    },
  });
}
