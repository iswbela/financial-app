import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { UsersService } from '../app/shared/service/users.service';
import { UserDTO } from '../app/shared/dto/UserDTO';
import { filter, Observable } from 'rxjs';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  username: string | null = null;
  balance: number = 1250.75;
  transactions: Transaction[] = [];
  user: UserDTO = UserDTO.getInstance();

  constructor(
    private router: Router, 
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {    
    this.carregaUsuario();
    this.defineTransactions();
  }

  carregaUsuario() {
    // Check for user in current history state first (works on initial load)
    const state = history.state;
    if (state && state.user) {
      this.user = state.user;
      this.username = this.user.name;
      console.log('User loaded from history state:', this.username);
    }
    
    // Also subscribe to future navigation events - with explicit casting
    (this.router.events as Observable<RouterEvent>).pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // For subsequent navigations, also check history state
      const navState = history.state;
      if (navState && navState.user) {
        this.user = navState.user;
        this.username = this.user.name;
        console.log('User loaded from navigation event:', this.username);
      }
    });
  }
  defineTransactions(){
    this.transactions = [
      {
        id: 1,
        date: new Date('2025-03-04'),
        description: 'Salary',
        amount: 2000,
        type: 'income'
      },
      {
        id: 2,
        date: new Date('2025-03-03'),
        description: 'Groceries',
        amount: 85.25,
        type: 'expense'
      },
      {
        id: 3,
        date: new Date('2025-03-02'),
        description: 'Internet bill',
        amount: 65,
        type: 'expense'
      },
      {
        id: 4,
        date: new Date('2025-03-01'),
        description: 'Freelance work',
        amount: 400,
        type: 'income'
      }
    ];
  }

  addTransaction(): void {
    console.log('Add transaction clicked');
    // Implement your add transaction logic here
    // This would typically open a modal or navigate to a new page
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
}