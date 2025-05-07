import { CommonModule } from '@angular/common';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { UsersService } from '../app/shared/service/users.service';
import { UserDTO } from '../app/shared/dto/UserDTO';
import { filter, Observable } from 'rxjs';
import { TransactionsService } from '../app/shared/service/transactions.service';
import { TransactionModalComponent } from './transactionModal/transactionModal.component';
import { Modal } from 'bootstrap';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, ToastModule],
  providers: [MessageService]
})

export class HomeComponent implements OnInit {
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  private modalRef!: ComponentRef<TransactionModalComponent>;

  username: string | null = null;
  balance: number = 0;
  transactions: any[] = [];
  user: UserDTO = UserDTO.getInstance();
  userBalance: any;

  constructor(
    private router: Router, 
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private messageService: MessageService,
    private toastModule: ToastModule
  ) {}

  ngOnInit(): void {    
    this.openPopup('success', 'Success', 'Transaction created successfully.');
    // if (localStorage.getItem('transactionAdded') === 'true') {
    //   this.openPopup('success', 'Success', 'Transaction created successfully.');
    //   localStorage.removeItem('transactionAdded'); // Limpa o estado para não exibir sempre
    // }
    this.carregaUsuario();
  }

  carregaUsuario(callback?: () => void) {
    const atualizarUsuario = (userData: any) => {
      if (userData?.user) {
        this.user = userData.user;
        this.username = this.user.name;
        this.fetchBalance()
        if (callback) callback();
      } else {
        this.router.navigate(['/login']);
      }
    };
  
    atualizarUsuario(history.state);
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => atualizarUsuario(history.state));
  }  
  
  defineTransactions(userId: number){
    this.transactionsService.getTransactionsByUser(userId).subscribe(result => {
      this.transactions = result.map((transactions: any) => ({
        id: transactions.id,
        date: new Date(transactions.date),
        amount: Math.abs(transactions.amount), // Transforma em positivo
        description: transactions.description,
        type: transactions.amount > 0 ? 'income' : 'expense'
      }));
    });
  }

  addTransaction(): void {
    if (!this.modalRef) {
      this.modalRef = this.modalContainer.createComponent(TransactionModalComponent);
      document.body.appendChild(this.modalRef.location.nativeElement);
    }
    this.modalRef.instance.user = this.user;
    const modal = new Modal(document.getElementById('transactionModal')!);
    modal.show();
  }

  getTransactionIcon(type: string): string {
    return type === 'income' ? 'arrow_upward' : 'arrow_downward';
  }

  isIncome(type: string): boolean {
    return type === 'income';
  }

  isExpense(type: string): boolean {
    return type === 'expense';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  fetchUser(userId: number) {
    this.usersService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
      }
    });
  }

  fetchBalance(){
    if(this.user.id){
      this.transactionsService.getBalanceByUser(this.user.id).subscribe(result => {
        this.userBalance = result ? result : 0;
      })
      this.defineTransactions(this.user.id);
    } else {
      console.error(Error)
    }
  }

  openPopup(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}