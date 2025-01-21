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
public class Cluster implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String designation;

    private String description;

    private String type;

    private String role;

    private String status;

    private String location;

    @OneToMany(mappedBy = "cluster", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<Server> servers;

    @OneToMany(mappedBy = "cluster", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<ClusterApplication> clusterApplications;
}
