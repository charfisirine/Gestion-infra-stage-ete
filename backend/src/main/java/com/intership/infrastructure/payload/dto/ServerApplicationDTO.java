package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServerApplicationDTO {
    private Integer id;
    private String purpose;
    private String accessLink;
    private Integer serverId;
    private Integer applicationId;
}
