import { Component, Input } from '@angular/core';
import { Card } from '../../shared/model/card.model';
import { CardService } from '../../shared/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;

  constructor(private cardService: CardService) {}
  onCreate() {
    this.cardService.create(this.card).subscribe();
  }

  onDelete() {
    this.cardService.delete(this.card).subscribe();
  }



}
