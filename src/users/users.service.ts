import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id:1,
            name:'keshav',
            username:'KESHAV',
            password:'hello',
        },
        {
            id:2,
            name:'Nest',
            username:'NEST',
            password:'js',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
