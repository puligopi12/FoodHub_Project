package com.foodhub.backend.repository;

import com.foodhub.backend.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
