package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NetworkDTO {
    private Integer id;
    private String name;
    private String ipRange;
    private String networkType;
    private SiteDTO site;
}
