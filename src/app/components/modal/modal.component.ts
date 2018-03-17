import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../../shared/model/card.model';
import { CardService } from '../../shared/services/card.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  card: Card = new Card();
  modal: NgbModalRef;

  closeResult: string;

  constructor(private modalService: NgbModal, private cardService: CardService) { }

  open(content) {
    this.modal = this.modalService.open(content);
  }

  onSubmit(form: NgForm) {
    this.cardService.create(this.card)
      .subscribe(() => {
        this.card = new Card();
        this.modal.close();
      });
  }
}
