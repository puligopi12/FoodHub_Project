package com.foodhub.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String recipientEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("appfoodhub@gmail.com");
        message.setTo(recipientEmail);
        message.setSubject("FoodHub Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                        "We received a request to reset your FoodHub account password.\n\n" +
                        "Your OTP is: " + otp + "\n\n" +
                        "This OTP is valid for 5 minutes.\n\n" +
                        "If you did not request a password reset, please ignore this email.\n\n" +
                        "Regards,\n" +
                        "FoodHub Team"
        );

        mailSender.send(message);
    }
}