import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Todo } from 'todo/';
import { Todo } from '../domain/entities';
export class InMemoryTodoDbService implements InMemoryDbService {
    createDb(){
        const todos: Todo[] = [
            {id: '111', desc: 'getting up', completed: true,userId:1},
            {id: '222', desc: 'go to school', completed: false, userId: 2},
        ];
        return {todos};
    }
}
