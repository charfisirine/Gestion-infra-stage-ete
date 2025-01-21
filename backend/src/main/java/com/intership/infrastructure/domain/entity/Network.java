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
public class Network implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String ipRange;

    @Column(nullable = false)
    private String networkType;

    @OneToMany(mappedBy = "network", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<Subnet> subnets;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;
}
