// Code generated by rbacgen/main.go. DO NOT EDIT.

import type { RBACAction, RBACResource } from "./typesGenerated";

// RBACResourceActions maps RBAC resources to their possible actions.
// Descriptions are included to document the purpose of each action.
// Source is in 'coderd/rbac/policy/policy.go'.
export const RBACResourceActions: Partial<
	Record<RBACResource, Partial<Record<RBACAction, string>>>
> = {
	api_key: {
		create: "create an api key",
		delete: "delete an api key",
		read: "read api key details (secrets are not stored)",
		update: "update an api key, eg expires",
	},
	assign_org_role: {
		assign: "ability to assign org scoped roles",
		create: "ability to create/delete/edit custom roles within an organization",
		delete: "ability to delete org scoped roles",
		read: "view what roles are assignable",
	},
	assign_role: {
		assign: "ability to assign roles",
		create: "ability to create/delete/edit custom roles",
		delete: "ability to unassign roles",
		read: "view what roles are assignable",
	},
	audit_log: {
		create: "create new audit log entries",
		read: "read audit logs",
	},
	debug_info: {
		read: "access to debug routes",
	},
	deployment_config: {
		read: "read deployment config",
		update: "updating health information",
	},
	deployment_stats: {
		read: "read deployment stats",
	},
	file: {
		create: "create a file",
		read: "read files",
	},
	group: {
		create: "create a group",
		delete: "delete a group",
		read: "read groups",
		update: "update a group",
	},
	group_member: {
		read: "read group members",
	},
	license: {
		create: "create a license",
		delete: "delete license",
		read: "read licenses",
	},
	notification_preference: {
		read: "read notification preferences",
		update: "update notification preferences",
	},
	notification_template: {
		read: "read notification templates",
		update: "update notification templates",
	},
	oauth2_app: {
		create: "make an OAuth2 app.",
		delete: "delete an OAuth2 app",
		read: "read OAuth2 apps",
		update: "update the properties of the OAuth2 app.",
	},
	oauth2_app_code_token: {
		create: "",
		delete: "",
		read: "",
	},
	oauth2_app_secret: {
		create: "",
		delete: "",
		read: "",
		update: "",
	},
	organization: {
		create: "create an organization",
		delete: "delete an organization",
		read: "read organizations",
		update: "update an organization",
	},
	organization_member: {
		create: "create an organization member",
		delete: "delete member",
		read: "read member",
		update: "update an organization member",
	},
	provisioner_daemon: {
		create: "create a provisioner daemon",
		delete: "delete a provisioner daemon",
		read: "read provisioner daemon",
		update: "update a provisioner daemon",
	},
	provisioner_keys: {
		create: "create a provisioner key",
		delete: "delete a provisioner key",
		read: "read provisioner keys",
	},
	replicas: {
		read: "read replicas",
	},
	system: {
		create: "create system resources",
		delete: "delete system resources",
		read: "view system resources",
		update: "update system resources",
	},
	tailnet_coordinator: {
		create: "",
		delete: "",
		read: "",
		update: "",
	},
	template: {
		create: "create a template",
		delete: "delete a template",
		read: "read template",
		update: "update a template",
		view_insights: "view insights",
	},
	user: {
		create: "create a new user",
		delete: "delete an existing user",
		read: "read user data",
		read_personal: "read personal user data like user settings and auth links",
		update: "update an existing user",
		update_personal: "update personal data",
	},
	workspace: {
		application_connect: "connect to workspace apps via browser",
		create: "create a new workspace",
		delete: "delete workspace",
		read: "read workspace data to view on the UI",
		ssh: "ssh into a given workspace",
		start: "allows starting a workspace",
		stop: "allows stopping a workspace",
		update: "edit workspace settings (scheduling, permissions, parameters)",
	},
	workspace_dormant: {
		application_connect: "connect to workspace apps via browser",
		create: "create a new workspace",
		delete: "delete workspace",
		read: "read workspace data to view on the UI",
		ssh: "ssh into a given workspace",
		start: "allows starting a workspace",
		stop: "allows stopping a workspace",
		update: "edit workspace settings (scheduling, permissions, parameters)",
	},
	workspace_proxy: {
		create: "create a workspace proxy",
		delete: "delete a workspace proxy",
		read: "read and use a workspace proxy",
		update: "update a workspace proxy",
	},
};
