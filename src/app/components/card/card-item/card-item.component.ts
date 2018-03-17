import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../../../shared/model/card.model';
import { CardService } from '../../../shared/services/card.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() card : Card;

  modal: NgbModalRef;
  constructor(private modalService: NgbModal, private cardService: CardService) { }

  ngOnInit() {
  }

  open(content) {
    this.modal = this.modalService.open(content);
  }
  
  onEdit(card) {
    this.cardService.edit(this.card)
      .subscribe(() => {
        this.modal.close()
      });
  }


}
