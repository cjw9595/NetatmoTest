import {Component, OnInit} from '@angular/core';
import { Results } from '../interface/random-user'
import {RandomUserService} from "../service/random-user.service";

/**
 * @author: Jiawei CHEN
 */
@Component({
  selector: 'app-random-users',
  templateUrl: './random-users.component.html',
  styleUrls: ['./random-users.component.css']
})
export class RandomUsersComponent implements OnInit {

  //stock information of users
  randomUsersList:Results[] = [];


  constructor(private randomUserService: RandomUserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * function used to get 10 users at a time and stock their information
   */
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
    console.log(this.randomUsersList);

  }

  /**
   * function used to delete the user selected
   * @param user
   */
  deleteUser(user: Results){
    const index=this.randomUsersList.findIndex(item=>item===user);
    if(index!== -1) {
      this.randomUsersList.splice(index, 1);
    }
  }

  /**
   * function used to add 10 new users at a time
   */
  addNewUsers(){
    this.getUsers();
  }

}
