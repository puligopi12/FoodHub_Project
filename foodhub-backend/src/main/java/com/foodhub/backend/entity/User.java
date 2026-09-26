package com.foodhub.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String userCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false)
    private String role = "USER";


    // =====================================================
    // PASSWORD RESET
    // =====================================================

    @Column
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String resetOtp;

    @Column
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDateTime resetOtpExpiry;

}