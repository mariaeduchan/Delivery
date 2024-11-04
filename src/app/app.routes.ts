import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { AdicionaisComponent } from './components/adicionais/adicionais.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CozinhaComponent } from './components/cozinha/cozinha.component';

const routes: Routes = [
  { path: '', component: CardapioComponent },
  { path: 'adicionais/:id', component: AdicionaisComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cozinha', component: CozinhaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
