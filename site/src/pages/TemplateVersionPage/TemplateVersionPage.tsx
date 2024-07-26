import { type FC, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  templateByName,
  templateFiles,
  templateVersion,
  templateVersionByName,
} from "api/queries/templates";
import { useAuthenticated } from "contexts/auth/RequireAuth";
import { pageTitle } from "utils/page";
import TemplateVersionPageView from "./TemplateVersionPageView";

type Params = {
  version: string;
  template: string;
};

export const TemplateVersionPage: FC = () => {
  const { version: versionName, template: templateName } =
    useParams() as Params;
  const { organization: organizationId } = useParams() as {
    organization: string;
  };

  /**
   * Template version files
   */
  const templateQuery = useQuery(templateByName(organizationId, templateName));
  const selectedVersionQuery = useQuery(
    templateVersionByName(organizationId, templateName, versionName),
  );
  const selectedVersionFilesQuery = useQuery({
    ...templateFiles(selectedVersionQuery.data?.job.file_id ?? ""),
    enabled: Boolean(selectedVersionQuery.data),
  });
  const activeVersionQuery = useQuery({
    ...templateVersion(templateQuery.data?.active_version_id ?? ""),
    enabled: Boolean(templateQuery.data),
  });
  const activeVersionFilesQuery = useQuery({
    ...templateFiles(activeVersionQuery.data?.job.file_id ?? ""),
    enabled: Boolean(activeVersionQuery.data),
  });

  const { permissions } = useAuthenticated();
  const versionId = selectedVersionQuery.data?.id;
  const createWorkspaceUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (versionId) {
      params.set("version", versionId);
      return `/templates/${organizationId}/${templateName}/workspace?${params.toString()}`;
    }
    return undefined;
  }, [templateName, versionId, organizationId]);

  return (
    <>
      <Helmet>
        <title>{pageTitle(`Version ${versionName} · ${templateName}`)}</title>
      </Helmet>

      <TemplateVersionPageView
        error={
          templateQuery.error ||
          selectedVersionQuery.error ||
          selectedVersionFilesQuery.error ||
          activeVersionQuery.error ||
          activeVersionFilesQuery.error
        }
        currentVersion={selectedVersionQuery.data}
        currentFiles={selectedVersionFilesQuery.data}
        baseFiles={activeVersionFilesQuery.data}
        versionName={versionName}
        templateName={templateName}
        organizationId={organizationId}
        createWorkspaceUrl={
          permissions.updateTemplates ? createWorkspaceUrl : undefined
        }
      />
    </>
  );
};

export default TemplateVersionPage;
