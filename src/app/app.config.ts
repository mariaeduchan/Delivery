import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { CozinhaComponent } from './components/cozinha/cozinha.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { InfoComponent } from './components/info/info.component';
import { SucessoComponent } from './components/sucesso/sucesso.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

const routes: Routes = [
  { path: 'gerente', component: DishListComponent },
  { path: 'add-dish', component: DishFormComponent },
  { path: 'edit-dish/:id', component: DishFormComponent },
  { path: 'cozinha', component: CozinhaComponent },
  { path: '', component: CardapioComponent },
  { path: 'info', component: InfoComponent },
  { path: 'sucesso', component: SucessoComponent },
  { path: 'carrinho', component: CarrinhoComponent},
  { path: 'adicionais/:id', component: AdicionaisComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
};
import { AdicionaisComponent } from './components/adicionais/adicionais.component';
