// transaction-modal.component.ts
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../app/shared/model/Transaction';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserDTO } from '../../app/shared/dto/UserDTO';
import { TransactionsService } from '../../app/shared/service/transactions.service';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  templateUrl: './transactionModal.component.html',
  styleUrls: ['./transactionModal.component.scss'],
  providers: [DatePipe, MessageService],
  imports: [FormsModule, ToastModule]
})

export class TransactionModalComponent {
  @Input() user!: UserDTO;
  transaction: Transaction;
  transactionType: number | undefined;

  constructor(
    private datePipe: DatePipe,
    private messageService: MessageService,
    private transactionService: TransactionsService
  ) {
    this.transaction = Transaction.getInstance();
    this.transaction.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  saveTransaction() {
    if(!this.verifyEmptyFields()){
      this.processTransaction();
    }
  }

  verifyEmptyFields() {
    if (!this.transaction.amount ||
      this.transaction.amount <= 0 ||
      !this.transaction.date ||
      !this.transaction.description ||
      this.transactionType == undefined
    ) {
      this.openPopup('warn', 'Warn', "You must fill all the fields in order to create a transaction.");
      return true;
    } else {
      return false;
    }
  }

  processTransaction(){
    this.transaction.amount = this.transactionType == 0 ? this.transaction.amount! * -1 : this.transaction.amount!;
    this.transaction.userId = this.user.id;
    this.transactionService.createTransaction(this.transaction).subscribe(
      (result)=>{
        localStorage.setItem('transactionAdded', 'true');
        window.location.reload();
      },
      (error)=>{
        console.error(error);
      }
    )
  }

  openPopup(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}