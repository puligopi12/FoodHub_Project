package com.foodhub.backend.service;

import com.foodhub.backend.dto.OrderItemRequest;
import com.foodhub.backend.dto.OrderRequest;
import com.foodhub.backend.entity.Food;
import com.foodhub.backend.entity.Order;
import com.foodhub.backend.entity.OrderItem;
import com.foodhub.backend.entity.User;
import com.foodhub.backend.repository.FoodRepository;
import com.foodhub.backend.repository.OrderItemRepository;
import com.foodhub.backend.repository.OrderRepository;
import com.foodhub.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            FoodRepository foodRepository,
            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.foodRepository = foodRepository;
        this.userRepository = userRepository;
    }


    // =====================================================
    // CREATE ORDER
    // =====================================================

    public Order createOrder(OrderRequest request) {

        // -------------------------------------------------
        // 1. GET LOGGED-IN USER
        // -------------------------------------------------

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }


        String email =
                authentication.getName();


        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        // -------------------------------------------------
        // 2. VALIDATE ORDER ITEMS
        // -------------------------------------------------

        if (request.getItems() == null ||
                request.getItems().isEmpty()) {

            throw new RuntimeException(
                    "Order must contain at least one food item"
            );
        }


        // -------------------------------------------------
        // 3. CREATE ORDER
        // -------------------------------------------------

        Order order = new Order();

        order.setOrderNumber(
                generateOrderNumber()
        );

        order.setUser(user);

        order.setCustomerName(
                request.getName()
        );

        order.setPhone(
                request.getPhone()
        );

        order.setAddress(
                request.getAddress()
        );

        order.setCity(
                request.getCity()
        );

        order.setPincode(
                request.getPincode()
        );

        order.setPaymentMethod(
                request.getPaymentMethod()
        );

        order.setStatus(
                "ORDER_PLACED"
        );

        order.setOrderDate(
                LocalDateTime.now()
        );


        // -------------------------------------------------
        // 4. CALCULATE ITEMS
        // -------------------------------------------------

        double subtotal = 0;

        List<OrderItem> orderItems =
                new ArrayList<>();


        for (OrderItemRequest itemRequest :
                request.getItems()) {


            // ---------------------------------------------
            // Validate quantity
            // ---------------------------------------------

            if (itemRequest.getQuantity() <= 0) {

                throw new RuntimeException(
                        "Food quantity must be greater than zero"
                );
            }


            // ---------------------------------------------
            // Find food from DATABASE
            // ---------------------------------------------

            Food food =
                    foodRepository
                            .findById(
                                    itemRequest.getFoodId()
                            )
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Food not found with ID: "
                                                    + itemRequest.getFoodId()
                                    )
                            );


            // ---------------------------------------------
            // Get CURRENT price from database
            // ---------------------------------------------

            double price =
                    food.getPrice();


            // ---------------------------------------------
            // Calculate item total
            // ---------------------------------------------

            double itemTotal =
                    price * itemRequest.getQuantity();


            subtotal += itemTotal;


            // ---------------------------------------------
            // Create OrderItem
            // ---------------------------------------------

            OrderItem orderItem =
                    new OrderItem();

            orderItem.setOrder(order);

            orderItem.setFood(food);

            orderItem.setQuantity(
                    itemRequest.getQuantity()
            );

            orderItem.setPrice(price);

            orderItem.setTotal(itemTotal);


            orderItems.add(orderItem);
        }


        // -------------------------------------------------
        // 5. DELIVERY CHARGE
        // -------------------------------------------------

        double deliveryCharge = 40;


        // -------------------------------------------------
        // 6. FINAL TOTAL
        // -------------------------------------------------

        double total =
                subtotal + deliveryCharge;


        order.setSubtotal(
                subtotal
        );

        order.setDeliveryCharge(
                deliveryCharge
        );

        order.setTotal(
                total
        );


        // -------------------------------------------------
        // 7. CONNECT ITEMS TO ORDER
        // -------------------------------------------------

        order.setItems(
                orderItems
        );


        // -------------------------------------------------
        // 8. SAVE ORDER
        // -------------------------------------------------

        return orderRepository.save(order);
    }


    // =====================================================
    // GENERATE ORDER NUMBER
    // =====================================================

    private String generateOrderNumber() {

        return "FH"
                + System.currentTimeMillis()
                + "-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();
    }
    // =====================================================
// GET ORDERS BY USER
// =====================================================

    public List<Order> getOrdersByUser(User user) {

        return orderRepository
                .findByUserOrderByOrderDateDesc(user);
    }
}