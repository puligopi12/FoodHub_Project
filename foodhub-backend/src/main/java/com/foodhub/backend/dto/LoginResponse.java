package com.foodhub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String message;
    private String userCode;
    private String name;
    private String email;
    private String role;
    private String token;
    private String refreshToken;
}