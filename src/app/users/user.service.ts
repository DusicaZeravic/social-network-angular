import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users`);
    }

    getUserInfo(userId: number): Observable<any> {
        return this.getAllUsers().pipe(
            map((users: User[]) => getUserInfoObject(userId, users)));
    }
}

function getDuplicateItems(arr) {
    return arr.filter(id => countInArray(arr, id) >= 2);
}

function countInArray(array, what) {
    return array.filter(item => item === what).length;
}

function getUserInfoObject(userId: number, users: User[]) {
    let user = users.filter(user => user.id === userId)[0];

    let friends = user.friends.map(friend => users.find(user => user.id === friend));
    
    let allFriendsOfFriendsIdsWithDuplicates = friends.map(friend => friend.friends).flat();

    let allFriendsOfFriendsIds = [...new Set(allFriendsOfFriendsIdsWithDuplicates)];

    let friendsOfFriends = allFriendsOfFriendsIds.filter(friend => !user.friends.includes(friend) && user.id !== friend).map(friend => users.find(user => user.id === friend));

    let withAtLeastTwoFriends = getDuplicateItems(allFriendsOfFriendsIdsWithDuplicates);
    let suggestedFriends = [...new Set([...withAtLeastTwoFriends])].filter(friend => !user.friends.includes(friend) && user.id !== friend).map(friend => users.find(user => user.id === friend));
    
    return {
        friends: friends,
        friendsOfFriends: friendsOfFriends,
        suggestedFriends: suggestedFriends
    }
}