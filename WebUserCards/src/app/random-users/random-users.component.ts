import {Component, OnInit} from '@angular/core';
import { RandomUser,Results,Info } from '../interface/random-user'
import {RandomUserService} from "../service/random-user.service";

@Component({
  selector: 'app-random-users',
  templateUrl: './random-users.component.html',
  styleUrls: ['./random-users.component.css']
})
export class RandomUsersComponent implements OnInit {

  randomUsersList:Results[] = [];


  constructor(private randomUserService: RandomUserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
   // this.randomUserService.getUsers().subscribe(users => console.log(users));
    this.randomUserService.getUsers().subscribe(data => {
      if (data.results.length > 0) {
        for (let i=0;i<data.results.length;i++)
        {
          this.randomUsersList.push(data.results[i]);
        }
      }
    });

   // this.randomUserService.getUsers().subscribe(users => this.userDetail=users);
    console.log(this.randomUsersList);


  }

  deleteUser(user: Results){
    const index=this.randomUsersList.findIndex(item=>item===user);
    if(index!== -1) {
      this.randomUsersList.splice(index, 1);
    }
  }

  addNewUsers(){
    this.getUsers();

  }

}
