import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
    selector: 'app-user-info',
    templateUrl: './userInfo.component.html'
})

export class UserInfoComponent implements OnInit {
    userId: number;
    user: {
        friends: Array<User>;
        friendsOfFriends: Array<User>;
        suggestedFriends: Array<User>;
    };
    

    constructor(private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.userId = +params.userId;
        })
        this.getUser();
    }

    getUser(): void {
        this.userService.getUserInfo(this.userId).subscribe(res => {
            this.user = res;
        })
    }
}