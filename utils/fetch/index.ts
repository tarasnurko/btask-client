// Auth
export { login } from "./auth/login";

// Leads
export { getLeads } from "./leads/getLeads";
export { createLead } from "./leads/createLead";
export { deleteLead } from "./leads/deleteLead";

export { getLeadTasks } from "./leads/getLeadTasks";
export type { GetLeadTasks, GetLeadTasksError } from "./leads/getLeadTasks";

export { changeLeadTasks } from "./leads/changeLeadTasks";
export type {
  ChangeLeadTasks,
  ChangeLeadTasksError,
} from "./leads/changeLeadTasks";

// Tasks
export { getNextTasks } from "./tasks/getNextTasks";
export type {
  GetNextTasks,
  GetNextTasksError,
  GetNextTasksRes,
} from "./tasks/getNextTasks";

export { updateTask, TaskUpdateStatus } from "./tasks/updateTask";
export type { UpdateTask, UpdateTaskError } from "./tasks/updateTask";

// Scripts
export { getScripts } from "./scripts/getScripts";
export type { GetScripts, GetScriptsError } from "./scripts/getScripts";

export { createScript } from "./scripts/createScript";
export type { CreateScript, CreateScriptError } from "./scripts/createScript";

export { deleteScript } from "./scripts/deleteScript";
export type { DeleteScriptError } from "./scripts/deleteScript";

// Analytics
export { getFailureTasksAnalytics } from "./analytics/getFailureTasksAnalytics";
export type {
  GetFailureTasksAnalytics,
  GetFailureTasksAnalyticsError,
  GetFailureTasksAnalyticsRes,
} from "./analytics/getFailureTasksAnalytics";
