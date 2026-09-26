package com.foodhub.backend.service;

import com.foodhub.backend.dto.VerifyOtpRequest;
import com.foodhub.backend.dto.ForgotPasswordRequest;
import com.foodhub.backend.dto.LoginRequest;
import com.foodhub.backend.dto.LoginResponse;
import com.foodhub.backend.dto.ResetPasswordRequest;
import com.foodhub.backend.entity.User;
import com.foodhub.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    // =====================================================
    // REGISTER USER
    // =====================================================

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.existsByPhone(user.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        user.setRole("USER");

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // =====================================================
    // LOGIN USER
    // =====================================================

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        String refreshToken = jwtService.generateRefreshToken(user.getEmail());
        return new LoginResponse(
                "Login successful",
                user.getUserCode(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token,
                refreshToken
        );
    }

    // =====================================================
    // FORGOT PASSWORD - GENERATE OTP
    // =====================================================

    public String generateResetOtp(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not registered")
                );

        // Generate 6-digit OTP
        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        // Save OTP
        user.setResetOtp(otp);

        // OTP valid for 5 minutes
        user.setResetOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );

        userRepository.save(user);

        // Send OTP to customer's email
        emailService.sendOtpEmail(
                user.getEmail(),
                otp
        );

        // Do NOT return the actual OTP
        return "OTP sent successfully to your registered email.";
    }

    // =====================================================
    // VERIFY RESET OTP
    // =====================================================

    public String verifyResetOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not registered")
                );

        // Check whether OTP exists
        if (user.getResetOtp() == null ||
                user.getResetOtpExpiry() == null) {

            throw new RuntimeException(
                    "No OTP found. Please request a new OTP."
            );
        }

        // Check OTP expiry
        if (LocalDateTime.now()
                .isAfter(user.getResetOtpExpiry())) {

            // Clear expired OTP
            user.setResetOtp(null);
            user.setResetOtpExpiry(null);

            userRepository.save(user);

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }

        // Check OTP value
        if (!user.getResetOtp().equals(request.getOtp())) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        return "OTP verified successfully";
    }

    // =====================================================
    // RESET PASSWORD
    // =====================================================

    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not registered")
                );

        // Check whether OTP exists
        if (user.getResetOtp() == null ||
                user.getResetOtpExpiry() == null) {

            throw new RuntimeException(
                    "No OTP found. Please request a new OTP."
            );
        }

        // Check OTP expiry
        if (LocalDateTime.now()
                .isAfter(user.getResetOtpExpiry())) {

            user.setResetOtp(null);
            user.setResetOtpExpiry(null);

            userRepository.save(user);

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }

        // Check OTP
        if (!user.getResetOtp().equals(request.getOtp())) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // Check new password
        if (request.getNewPassword() == null ||
                request.getNewPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "New password cannot be empty"
            );
        }

        // Encrypt new password
        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        // OTP can only be used once
        user.setResetOtp(null);
        user.setResetOtpExpiry(null);

        userRepository.save(user);

        return "Password reset successfully";


    }

    public String refreshAccessToken(String refreshToken) {

        try {

            System.out.println("=================================");
            System.out.println("REFRESH TOKEN RECEIVED");
            System.out.println(refreshToken);
            System.out.println("=================================");

            var claims = jwtService.validateRefreshToken(refreshToken);

            String email = claims.getPayload().getSubject();

            System.out.println("REFRESH TOKEN VALID");
            System.out.println("EMAIL: " + email);

            String newAccessToken = jwtService.generateToken(email);

            System.out.println("NEW ACCESS TOKEN GENERATED");

            return newAccessToken;

        } catch (Exception exception) {

            System.out.println("=================================");
            System.out.println("REFRESH TOKEN ERROR");
            System.out.println("ERROR TYPE: "
                    + exception.getClass().getName());
            System.out.println("ERROR MESSAGE: "
                    + exception.getMessage());
            System.out.println("=================================");

            throw new RuntimeException(
                    "Invalid or expired refresh token"
            );
        }
    }
}