package com.foodhub.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
    @Table(name = "foods")


    public class Food {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @Column(length = 1000)
        private String description;

        private String category;

        private String type;

        private double price;

        private double rating;

        private String deliveryTime;

        @Column(length = 1000)
        private String image;

        private boolean available = true;

    }
