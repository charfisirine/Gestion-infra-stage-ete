package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClusterDTO {
    private Integer id;
    private String designation;
    private String description;
    private String type;
    private String role;
    private String status;
    private String location;
}
