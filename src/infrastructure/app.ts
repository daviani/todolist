import fastify, { FastifyInstance } from 'fastify';
import { P } from 'pino';
import { listTasks } from '../domain/usecases/queries/list_tasks';
import { createTask } from '../domain/usecases/commands/create_task';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';
import { closeTask } from '../domain/usecases/commands/close_task';
import { reopenTask } from '../domain/usecases/commands/reopen_task';

function build(logger?: P.Logger): FastifyInstance {
  const server = fastify({
    logger
  });

  server.get('/ping', async () => {
    return 'pong\n';
  });

  // Get all tasks
  server.get('/tasks', async () => {
    const taskRepository = new TaskRepositorySql();
    const taskList = await listTasks(taskRepository);
    return taskList.tasks;
  });

  // Crate a new task
  server.post('/tasks', async (request) => {
    const params = request.body;
    const taskRepository = new TaskRepositorySql();
    return await createTask(params, taskRepository);
  });

  // Get a task
  server.get('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Update a task
  server.post('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Close a task
  server.post('/tasks/:id/close', async (request) => {
    // @ts-ignore
    const id = parseInt(request.params.id);
    const taskRepositorySql = new TaskRepositorySql();
    return await closeTask(id, taskRepositorySql);
  });

  // Reopen a task
  server.post('/tasks/:id/reopen', async (request) => {
    // @ts-ignore
    const id = parseInt(request.params.id);
    const taskRepositorySql = new TaskRepositorySql();
    return await reopenTask(id, taskRepositorySql);
  });

  // Delete a task
  server.delete('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  return server;
}

export { build };
