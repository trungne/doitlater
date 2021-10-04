export enum TaskStatus {
    Todo = 0,
    Doing = 1,
    Done = 2,
}

export interface Task {
    description: string;
    id: string;
    status: TaskStatus;
}