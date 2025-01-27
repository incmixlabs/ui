import {
  CardContainer,
  type FormFieldConfig,
  type TreeDataItem,
  TreeView,
  type TreeViewDescriptions,
} from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Flex, Text } from "@radix-ui/themes"
import { useTranslation } from "react-i18next"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { PageLayout } from "../common/components/layouts/page-layout"
import { OrganizationLayout } from "./layouts/organisation-layout"
import { OrganisationEnvVarsRoute } from "./routes"
import { useOrganization } from "./utils"

type EnvVarsState = {
  treeData: TreeDataItem[] | TreeDataItem
  setTreeData: (data: TreeDataItem[] | TreeDataItem) => void
}

export const useEnvVarsStore = create<EnvVarsState>()(
  persist(
    (set) => ({
      treeData: [],
      setTreeData: (data) => set({ treeData: data }),
    }),
    {
      name: "env-vars-storage",
    }
  )
)

const OrganizationEnvVarsPage: React.FC = () => {
  const { t } = useTranslation(["organizationDetails", "environmentVariables"])
  const { treeData, setTreeData } = useEnvVarsStore()

  const DESCRIPTIONS: TreeViewDescriptions = {
    edit: t("common:edit"),
    delete: t("common:delete"),
    name: t("common:name"),
    value: t("common:value"),
    notes: t("common:notes"),
    above: t("common:above"),
    below: t("common:below"),
    inside: t("common:inside"),
    createFileContextMenu: t("environmentVariables:createFileContextMenu"),
    createFolderContextMenu: t("environmentVariables:createFolderContextMenu"),
    newFileTitle: t("environmentVariables:newFileTitle"),
    newFolderTitle: t("environmentVariables:newFolderTitle"),
    editFileTitle: t("environmentVariables:editFileTitle"),
    editFolderTitle: t("environmentVariables:editFolderTitle"),
  }

  const FILE_FIELDS: FormFieldConfig[] = [
    {
      name: "value",
      label: t("common:value"),
      type: "text",
      required: true,
    },
    {
      name: "notes",
      label: t("common:notes"),
      type: "textarea",
      required: true,
    },
  ]

  const FOLDER_FIELDS: FormFieldConfig[] = [
    {
      name: "notes",
      label: t("common:notes"),
      type: "textarea",
      required: true,
    },
  ]

  const { orgHandle } = OrganisationEnvVarsRoute.useParams()
  const { organization } = useOrganization(orgHandle)

  if (!organization) {
    return <div>{t("organizationDetails:notFound")}</div>
  }

  return (
    <DashboardLayout
      breadcrumbItems={[
        {
          label: organization.name,
          url: "/organization/$orgHandle",
        },
        {
          label: t("environmentVariables"),
          url: "/organization/$orgHandle/env-vars",
        },
      ]}
    >
      <OrganizationLayout activeTab="env-vars">
        <CardContainer>
          <Flex direction="column" gap="4">
            <Text size="5" weight="bold">
              {t("environmentVariables")}
            </Text>
            <TreeView
              data={treeData}
              setData={setTreeData}
              emptyMessage="No environment variables. Create a new variable or folder to get started."
              newFileButtonText="New Variable"
              newFolderButtonText="New Folder"
              fileFields={FILE_FIELDS}
              folderFields={FOLDER_FIELDS}
              descriptions={DESCRIPTIONS}
            />
          </Flex>
        </CardContainer>
      </OrganizationLayout>
    </DashboardLayout>
  )
}

export default OrganizationEnvVarsPage
