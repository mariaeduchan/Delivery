import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SucessoComponent {

  constructor(private router: Router) {}

  redirectToMenu() {
    this.router.navigate(['/cardapio']);
  }
}
