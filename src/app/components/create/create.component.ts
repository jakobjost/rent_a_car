import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.css' ]
})
export class CreateComponent implements OnInit {
  constructor(private User: UserService, private router: Router,private snackBar: MatSnackBar) {}
  registracijaForm = new FormGroup({
    email: new FormControl(''),
    phone_number: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  });
  ngOnInit() {
    
  }

  //ustvarjanje novega uporabnika
  createUser() {
    this.User.ustvariUserja(this.registracijaForm.value).subscribe(
      (data: any) => {
        //console.log(data);
        this.router.navigate([ '/login' ]);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Nazaj');
        } else {
          this.snackBar.open('Napaka pri registraciji!');
        }
      }
    );
  }
}


