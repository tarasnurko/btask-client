export { login } from "./auth/login";

export { getLeads } from "./leads/getLeads";
export { createLead } from "./leads/createLead";
export { deleteLead } from "./leads/deleteLead";

export { getNextTasks } from "./tasks/getNextTasks";
export type {
  GetNextTasks,
  GetNextTasksError,
  GetNextTasksRes,
} from "./tasks/getNextTasks";

export { updateTask, TaskUpdateStatus } from "./tasks/updateTask";
export type { UpdateTask, UpdateTaskError } from "./tasks/updateTask";
