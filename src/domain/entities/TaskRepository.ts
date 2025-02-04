import { TaskList } from './TaskList';
import { Task } from './Task';

export interface TaskRepository {
  findAll(): Promise<TaskList>;

  save(task: Task): Promise<Task>;
}
