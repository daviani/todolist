import { TaskRepository } from '../../entities/TaskRepository';
import { Status, Task } from '../../entities/Task';

async function reopenTask(id: number, taskRepository: TaskRepository): Promise<Task> {
  const task = await taskRepository.getById(id);
  if (task.status === Status.DONE) {
    task.reopen();
    return await taskRepository.update(task);
  } else {
    return await taskRepository.update(task);
  }
}

export {
  reopenTask
};
