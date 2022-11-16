import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  constructor(private User: UserService, private router: Router,private snackBar: MatSnackBar) {}
  prijavaForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  loginUser() {
    this.User.logirajUserja(this.prijavaForm.value).subscribe(
      (data: any) => {
        let token = data.token;
        localStorage.setItem('Token', token);
        this.router.navigate([ '/' ]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Zapri');
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }
  ngOnInit() {}
}

