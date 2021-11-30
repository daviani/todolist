import { TaskList } from './TaskList';
import { Task } from './Task';

export interface TaskRepository {
  findAll(): Promise<TaskList>;
  save(task: Task): Promise<Task>;
  getById (task: number): Promise<Task>;
  update(task: Task): Promise<Task>;
}
