package com.intership.infrastructure.payload.response;

import lombok.Getter;
import lombok.Setter;

public class JwtResponse {
    @Setter
    @Getter
    private String token;
    @Setter
    @Getter
    private String type = "Bearer";
    @Setter
    @Getter
    private Long id;
    @Setter
    @Getter
    private String username;
    @Setter
    @Getter
    private String email;

    public JwtResponse(String accessToken, Long id, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
