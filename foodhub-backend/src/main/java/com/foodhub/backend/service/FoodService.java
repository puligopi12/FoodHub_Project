package com.foodhub.backend.service;

import com.foodhub.backend.entity.Food;
import com.foodhub.backend.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Get all food items
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // Get food item by ID
    public Optional<Food> getFoodById(Long id) {
        return foodRepository.findById(id);
    }

    // Add new food item
    public Food addFood(Food food) {
        return foodRepository.save(food);
    }

    // Update food item
    public Food updateFood(Long id, Food updatedFood) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));

        existingFood.setName(updatedFood.getName());
        existingFood.setCategory(updatedFood.getCategory());
        existingFood.setType(updatedFood.getType());
        existingFood.setPrice(updatedFood.getPrice());
        existingFood.setRating(updatedFood.getRating());
        existingFood.setDeliveryTime(updatedFood.getDeliveryTime());
        existingFood.setImage(updatedFood.getImage());
        existingFood.setDescription(updatedFood.getDescription());

        return foodRepository.save(existingFood);
    }

    // Delete food item
    public void deleteFood(Long id) {

        if (!foodRepository.existsById(id)) {
            throw new RuntimeException("Food not found with id: " + id);
        }

        foodRepository.deleteById(id);
    }

    public List<Food> addFoods(List<Food> foods) {
        return foodRepository.saveAll(foods);
    }
}