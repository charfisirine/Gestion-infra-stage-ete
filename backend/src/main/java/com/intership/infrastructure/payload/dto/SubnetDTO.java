package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubnetDTO {
    private Integer id;
    private String cidrNotation;
    private String subnetMask;
    private String ipRange;
    private String gateway;
    private Integer networkId;
}
