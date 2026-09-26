package com.foodhub.backend.controller;

import com.foodhub.backend.dto.OrderRequest;
import com.foodhub.backend.entity.Order;
import com.foodhub.backend.entity.User;
import com.foodhub.backend.service.OrderService;
import com.foodhub.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(
            OrderService orderService,
            UserRepository userRepository) {

        this.orderService = orderService;
        this.userRepository = userRepository;
    }


    // =====================================================
    // CREATE ORDER
    // =====================================================

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderRequest request) {

        Order order =
                orderService.createOrder(request);

        return new ResponseEntity<>(
                order,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // GET MY ORDERS
    // =====================================================

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication) {

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        List<Order> orders =
                orderService.getOrdersByUser(user);

        return ResponseEntity.ok(orders);
    }
}