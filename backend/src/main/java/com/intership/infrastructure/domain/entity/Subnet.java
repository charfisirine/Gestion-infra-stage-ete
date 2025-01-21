package com.intership.infrastructure.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subnet implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cidrNotation;

    private String subnetMask;

    private String ipRange;

    private String gateway;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "network_id", nullable = false)
    private Network network;

    @OneToMany(mappedBy = "subnet", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<Server> servers;
}

