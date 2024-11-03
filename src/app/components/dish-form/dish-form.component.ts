import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class DishFormComponent implements OnInit {
  dish: Dish = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 1
  };

  isEdit: boolean = false;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.dishService.getDish(+id).subscribe((data: Dish) => {
        this.dish = data;
      });
    }
  }

  saveDish(): void {
    if (this.isEdit) {
      this.dishService.updateDish(this.dish.id, this.dish).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.dishService.createDish(this.dish).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
