import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { title } from 'process';
import { TaskStatus } from './dto/base-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
    private schedulerRegistry:SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
     ){}

  

     private readonly logger = new Logger(TodoService.name);

  async findAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    this.logger.log('Creating Todo...');
    const taskIncomplete = setTimeout(
      () => this.incompleteTask(title),
      5000,
      );
      this.schedulerRegistry.addTimeout(
        `${title}_incomplete_task`,
        taskIncomplete,
      );
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();

    
    
   
  }
  private incompleteTask(title : string) {
    this.logger.log('Task incomplete', title);

  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<Todo> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async updateTaskStatus(id:string, status: TaskStatus): Promise<Todo>{
    const task = this.model.findByIdAndUpdate(id).exec();
     //task.status = status;
    return await task;
    
  }

  //@Cron(CronExpression.EVERY_10_SECONDS)
 // taskIncomplete(){
   // this.logger.log('Task is incomplete');
 // }
}

  
  
