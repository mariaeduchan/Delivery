import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { CozinhaComponent } from './components/cozinha/cozinha.component';
import { InfoComponent } from './components/info/info.component';
import { SucessoComponent } from './components/sucesso/sucesso.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { AdicionaisComponent } from './components/adicionais/adicionais.component';
import { LoggingInterceptor } from './logging.interceptor';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'gerente', component: DishListComponent },
  { path: 'add-dish', component: DishFormComponent },
  { path: 'edit-dish/:id', component: DishFormComponent },
  { path: 'cozinha', component: CozinhaComponent },
  { path: 'info', component: InfoComponent },
  { path: 'sucesso', component: SucessoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'adicionais/:id', component: AdicionaisComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
};