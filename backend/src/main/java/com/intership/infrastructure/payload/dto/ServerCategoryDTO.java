package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServerCategoryDTO {
    private Integer id;
    private String name;
    private String description;
}
