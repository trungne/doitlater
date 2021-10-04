import { Task } from "./task/task";

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}