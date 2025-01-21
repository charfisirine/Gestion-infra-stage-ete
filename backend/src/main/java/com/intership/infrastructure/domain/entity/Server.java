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
public class Server implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String hostName;

    @Column(nullable = false)
    private String addressIp;

    @Column(nullable = false)
    private String status;

    private String specification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "server_category_id", nullable = false)
    private ServerCategory serverCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cluster_id", nullable = false)
    private Cluster cluster;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subnet_id", nullable = false)
    private Subnet subnet;

    @OneToMany(mappedBy = "server", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private Collection<ServerApplication> serverApplications;
}
