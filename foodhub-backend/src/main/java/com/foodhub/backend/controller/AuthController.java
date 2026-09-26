package com.foodhub.backend.controller;

import com.foodhub.backend.dto.ForgotPasswordRequest;
import com.foodhub.backend.dto.LoginRequest;
import com.foodhub.backend.dto.LoginResponse;
import com.foodhub.backend.entity.User;
import com.foodhub.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.foodhub.backend.dto.VerifyOtpRequest;
import com.foodhub.backend.dto.ResetPasswordRequest;
import com.foodhub.backend.dto.RefreshTokenRequest;
import com.foodhub.backend.dto.RefreshTokenResponse;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User registeredUser = authService.register(user);

        return new ResponseEntity<>(
                registeredUser,
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    // =====================================================
// FORGOT PASSWORD
// =====================================================

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        String otp =
                authService.generateResetOtp(request);

        return ResponseEntity.ok(
                "OTP generated successfully: " + otp
        );

    }

    // =====================================================
// VERIFY OTP
// =====================================================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        String message =
                authService.verifyResetOtp(request);

        return ResponseEntity.ok(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        String message = authService.resetPassword(request);

        return ResponseEntity.ok(message);
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(
            @RequestBody RefreshTokenRequest request) {

        String newToken =
                authService.refreshAccessToken(
                        request.getRefreshToken()
                );

        return ResponseEntity.ok(
                new RefreshTokenResponse(newToken)
        );
    }
}