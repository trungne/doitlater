export enum TaskStatus {
    Todo = "to-do",
    Doing = "doing",
    Done = "done",
}

export interface Task {
    projectID: string;
    id: string;
    description: string;
    status: TaskStatus;
}