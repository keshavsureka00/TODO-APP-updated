import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly service: TodoService) {}

// All todos
  @Get()
  async index() {
    return await this.service.findAll();
  }

//Find by id
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
//Create Todo
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    console.log({ createTodoDto });
    return await this.service.create(createTodoDto);
  }
//Update Todo
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.service.update(id, updateTodoDto);
  }
//Delete Todo
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
