import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/services/session.service';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.user;
    this.sessionService.user$.subscribe(user => this.user = user);
  }

  logOut() {
    this.sessionService.destroy().subscribe();
  }

}
