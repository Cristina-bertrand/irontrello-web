import { Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/model/user.model';
import { SessionService } from '../../shared/services/session.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  modal: NgbModalRef;
  user: User = new User();


  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService
  ) { }

  open(content) {
    this.modal = this.modalService.open(content);
  }

  onCreate(form: NgForm) {
    this.sessionService.signup(this.user)
      .subscribe(() => {
        this.modal.close();
      });
  }


}
