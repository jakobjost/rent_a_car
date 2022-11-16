import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

imports: [ MatButtonModule ];
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ]
})




export class HomeComponent implements OnInit {
  constructor(private user: UserService, private router: Router) {}
    pridobiPod() {
        this.user.pridobiPodatke().subscribe((data: any) => console.log(data));
    }
    
    ngOnInit() {
        this.pridobiPod();
    }
    //odjava uporabnika
    //odvzamemo token pred tem pa vprašamo ali se želi uporabik odjaviti
    logout() {
      if(confirm("Se želite odjaviti?")) {
      localStorage.removeItem('Token');
      this.router.navigate([ '/login' ]);
      }
      
  }

}

