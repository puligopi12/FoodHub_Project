package com.foodhub.backend.controller;

import com.foodhub.backend.entity.Food;
import com.foodhub.backend.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    // GET all food items
    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }

    // GET food item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {

        return foodService.getFoodById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - Add multiple food items
    @PostMapping("/bulk")
    public ResponseEntity<List<Food>> addFoods(
            @RequestBody List<Food> foods) {

        List<Food> savedFoods = foodService.addFoods(foods);

        return ResponseEntity.ok(savedFoods);
    }

    // POST - Add new food item
    @PostMapping
    public ResponseEntity<Food> addFood(@RequestBody Food food) {

        Food savedFood = foodService.addFood(food);

        return ResponseEntity.ok(savedFood);
    }

    // PUT - Update food item
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable Long id,
            @RequestBody Food food) {

        try {
            Food updatedFood = foodService.updateFood(id, food);

            return ResponseEntity.ok(updatedFood);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - Delete food item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {

        try {
            foodService.deleteFood(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}