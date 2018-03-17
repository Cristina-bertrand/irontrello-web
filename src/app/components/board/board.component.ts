import { Component, OnInit } from '@angular/core';
import { List } from '../../shared/model/list.model';
import { CardService } from '../../shared/services/card.service';
import { SessionService } from '../../shared/services/session.service';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists: Array<List> = [
    new List('ToDo'),
    new List('Work In Progress'),
    new List('Done')
  ];

  user: User;

  constructor(private cardService: CardService, private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.user;

    this.sessionService.user$.subscribe(user => this.user = user);

    if (this.user) {
      this.cardService.index().subscribe();
    }
  }
}
