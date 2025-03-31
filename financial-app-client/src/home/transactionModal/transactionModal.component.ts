// transaction-modal.component.ts
import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../app/shared/model/Transaction';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  templateUrl: './transactionModal.component.html',
  styleUrls: ['./transactionModal.component.scss'],
  providers: [DatePipe],
  imports: [FormsModule]
})

export class TransactionModalComponent {
  transaction: Transaction;
  transactionType: number | undefined;

  constructor(
    private datePipe: DatePipe
  ){
    this.transaction = Transaction.getInstance();
    this.transaction.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(){
  }

  saveTransaction(){
    console.log(this.transaction);
    console.log(this.transactionType);
  }
}