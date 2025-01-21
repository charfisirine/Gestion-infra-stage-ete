package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClusterApplicationDTO {
    private Integer id;
    private Integer applicationId;
    private Integer clusterId;
    private String status;
}
