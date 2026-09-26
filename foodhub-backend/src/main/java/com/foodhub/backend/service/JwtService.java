package com.foodhub.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    // ==============================
    // ACCESS TOKEN SECRET
    // ==============================

    private final SecretKey accessTokenSecretKey =
            Keys.hmacShaKeyFor(
                    "FoodHubAccessSecretKeyForJWTAuthentication2026"
                            .getBytes(StandardCharsets.UTF_8)
            );


    // ==============================
    // REFRESH TOKEN SECRET
    // ==============================

    private final SecretKey refreshTokenSecretKey =
            Keys.hmacShaKeyFor(
                    "FoodHubRefreshSecretKeyForJWTAuthentication2026"
                            .getBytes(StandardCharsets.UTF_8)
            );


    // ==============================
    // TOKEN EXPIRATION
    // ==============================

    // Access token = 15 minutes
    private final long accessTokenExpirationTime =
            1000L * 60 * 15;

    // Refresh token = 7 days
    private final long refreshTokenExpirationTime =
            1000L * 60 * 60 * 24 * 7;


    // ==============================
    // GENERATE ACCESS TOKEN
    // ==============================

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + accessTokenExpirationTime
                        )
                )
                .signWith(accessTokenSecretKey)
                .compact();
    }


    // ==============================
    // GENERATE REFRESH TOKEN
    // ==============================

    public String generateRefreshToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + refreshTokenExpirationTime
                        )
                )
                .signWith(refreshTokenSecretKey)
                .compact();
    }


    // ==============================
    // VALIDATE ACCESS TOKEN
    // ==============================

    public Jws<Claims> validateToken(String token) {

        return Jwts.parser()
                .verifyWith(accessTokenSecretKey)
                .build()
                .parseSignedClaims(token);
    }


    // ==============================
    // VALIDATE REFRESH TOKEN
    // ==============================

    public Jws<Claims> validateRefreshToken(String token) {

        return Jwts.parser()
                .verifyWith(refreshTokenSecretKey)
                .build()
                .parseSignedClaims(token);
    }
}