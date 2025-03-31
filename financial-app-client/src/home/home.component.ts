import { CommonModule } from '@angular/common';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { UsersService } from '../app/shared/service/users.service';
import { UserDTO } from '../app/shared/dto/UserDTO';
import { filter, Observable } from 'rxjs';
import { TransactionsService } from '../app/shared/service/transactions.service';
import { TransactionModalComponent } from './transactionModal/transactionModal.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
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
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {    
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
    // this.transactions = [
    //   {
    //     id: 1,
    //     date: new Date('2025-03-04'),
    //     description: 'Salary',
    //     amount: 2000,
    //     type: 'income'
    //   },
    //   {
    //     id: 2,
    //     date: new Date('2025-03-03'),
    //     description: 'Groceries',
    //     amount: 85.25,
    //     type: 'expense'
    //   },
    //   {
    //     id: 3,
    //     date: new Date('2025-03-02'),
    //     description: 'Internet bill',
    //     amount: 65,
    //     type: 'expense'
    //   },
    //   {
    //     id: 4,
    //     date: new Date('2025-03-01'),
    //     description: 'Freelance work',
    //     amount: 400,
    //     type: 'income'
    //   }
    // ];
  }

  addTransaction(): void {
    if (!this.modalRef) {
      this.modalRef = this.modalContainer.createComponent(TransactionModalComponent);
      document.body.appendChild(this.modalRef.location.nativeElement);
    }
    
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
        console.log('Usuário encontrado:', data);
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
      console.log('sem user id')
    }
  }
}