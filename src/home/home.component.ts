import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
  username: string = 'Alex';
  balance: number = 1250.75;
  transactions: Transaction[] = [];

  constructor() { }

  ngOnInit(): void {
    // Populate with sample transactions
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
}