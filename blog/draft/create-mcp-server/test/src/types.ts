export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskCreateInput {
  title: string;
  description: string;
}

export interface TaskCompleteInput {
  taskId: string;
}
