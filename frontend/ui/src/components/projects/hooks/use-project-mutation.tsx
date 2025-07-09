export function useProjectMutation() {
  const { selectedOrganisation } = useOrganizationStore();

  return useMutation({
    mutationFn: async (project: Project) => {
      if (!selectedOrganisation) {
        throw new Error("No organisation selected");
      }
      const formData = new FormData();
      // ... rest of the FormData construction logic

      const response = await fetch(PROJECTS_API_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to save project: ${response.status} - ${errorData}`);
      }

      return response.json();
    },
  });
}
