import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class DishFormComponent implements OnInit {
  dish: Dish = {
    id: '', 
    name: '',
    description: '',
    price: 0,
    image: '', 
    quantity: 1
  };
  isEdit: boolean = false;

  // Referência ao input de arquivo
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dishService.getDish(id).subscribe((data: Dish) => {
        this.dish = data;
      });
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dish.image = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageUpload(): void {
    this.fileInput.nativeElement.click();
  }

  saveDish(): void {
    if (this.isEdit) {
      this.dishService.updateDish(this.dish.id, this.dish).subscribe(
        () => {
          this.router.navigate(['/gerente']);
        },
        (error) => {
          console.error('Erro ao atualizar o prato:', error);
        }
      );
    } else {
      this.dish.id = uuidv4(); 
      this.dishService.createDish(this.dish).subscribe(
        () => {
          this.router.navigate(['/gerente']);
        },
        (error) => {
          console.error('Erro ao criar o prato:', error);
        }
      );
    }
  }
}
