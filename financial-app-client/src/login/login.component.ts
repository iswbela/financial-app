import { Component } from '@angular/core';
import { UsersService } from '../app/shared/service/users.service';
import { UserCreationDTO } from '../app/shared/dto/UserCreationDTO';
import { MessageService } from 'primeng/api';
import { UserLoginDTO } from '../app/shared/dto/UserLoginDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../app/shared/service/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})

export class LoginComponent {
  isRightPanelActive = false;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private service: LoginService,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) { }

  togglePanel() {
    this.clean();
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  clean() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onSubmitSignUp() {
    if (this.validSubmit(true)) {
      this.createUser();
    }
  }

  validSubmit(signUp: boolean) {
    if (this.name.trim() == '') {
      this.openPopup('warn', 'Warn', "The name field must not be empty. Please try again.");
      return false;
    } else if (this.email.trim() == '') {
      this.openPopup('warn', 'Warn', "The email field must not be empty. Please try again.");
      return false;
    } else if (this.invalidEmail()) {
      this.openPopup('warn', 'Warn', "The email is invalid. Please try again.");
      return false;
    } else if (this.password.trim() == '') {
      this.openPopup('warn', 'Warn', "The password field must not be empty. Please try again.");
      return false;
    } else if (signUp && this.invalidPassword()) {
      this.openPopup('warn', 'Warn', "The password doesn't meet the minimum requirements. Please try again.");
      return false;
    } else {
      return true;
    }
  }

  invalidEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(this.email);
  }

  invalidPassword() {
    return this.password.trim().length < 8 || this.password.trim().length > 20 ? true : false;
  }

  createUser() {
    let user = UserCreationDTO.getInstance();

    user.name = this.name;
    user.email = this.email;
    user.password = this.password;

    this.processUser(user);
  }

  processUser(user: UserCreationDTO) {
    this.usersService.createUser(user).subscribe({
      next: (response) => {
        this.openPopup('success', 'Success', 'User created successfully!');
        this.togglePanel();
      },
      error: (error) => {
        this.openPopup('error', 'Error', error.error);
      }
    });
  }

  openPopup(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  onSubmitSignIn() {
    this.name = 'name';
    if (this.validSubmit(false)) {
      let user = UserLoginDTO.getInstance();
      user.email = this.email;
      user.password = this.password;

      this.processLogin(user)
    }
  }

  processLogin(user: UserLoginDTO) {
    this.service.logIn(user).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.router.navigate(['/home'], { state: { user: response.body.user } });
        }
      },
      error: (error) => {
        if (error.status != 401) {
          this.openPopup('error', 'Error', error.error);
        } else {
          this.openPopup('warn', 'Warn', 'Invalid credentials. Please try again.');
        }
      }
    });
  }
}