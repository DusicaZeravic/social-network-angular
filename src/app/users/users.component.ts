import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
    users: Array<User>

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getAllUsers().subscribe(res => {
            if (res) {
                this.users = [];
                for (const data of res) {
                    const user = new User();
                    user.id = data.id;
                    user.firstName = data.firstName;
                    user.surname = data.surname;
                    user.age = data.age;
                    user.gender = data.gender;
                    user.friends = data.friends;
                    this.users.push(user);
                }
            }
        },
            err => {
                console.log('Error', err);
            })
    }
}