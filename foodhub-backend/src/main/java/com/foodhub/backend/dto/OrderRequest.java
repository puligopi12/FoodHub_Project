package com.foodhub.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private String name;

    private String phone;

    private String address;

    private String city;

    private String pincode;

    private String paymentMethod;

    private List<OrderItemRequest> items;
}