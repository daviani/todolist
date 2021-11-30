import { TaskRepository } from '../../entities/TaskRepository';
import { Status, Task } from '../../entities/Task';

async function closeTask(id: number, taskRepository: TaskRepository): Promise<Task> {
  const task = await taskRepository.getById(id);
  if (task.status === Status.TO_DO) {
    task.close();
    return await taskRepository.update(task);
  } else {
    return await taskRepository.update(task);
  }
}

export {
  closeTask
};
