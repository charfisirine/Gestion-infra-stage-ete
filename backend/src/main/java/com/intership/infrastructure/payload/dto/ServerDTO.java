package com.intership.infrastructure.payload.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServerDTO {
    private Integer id;
    private String hostName;
    private String addressIp;
    private String status;
    private String specification;
    private Integer serverCategoryId;
    private Integer clusterId;
    private Integer subnetId;
}
