import { Component, Input } from "@angular/core";
import { User } from "../../user.model";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    @Input() user: User;
}