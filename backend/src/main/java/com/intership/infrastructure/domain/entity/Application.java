package com.intership.infrastructure.domain.entity;

import com.intership.infrastructure.services.impl.CategoryApp;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_app_id", nullable = false)
    private CategoryApp categoryApp;

    @OneToMany(mappedBy = "application", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<ServerApplication> serverApplications;

    @OneToMany(mappedBy = "application", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<ClusterApplication> clusterApplications;
}
