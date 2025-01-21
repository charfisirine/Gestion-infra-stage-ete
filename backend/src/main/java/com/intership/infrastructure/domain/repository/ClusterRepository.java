package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.Cluster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClusterRepository extends JpaRepository<Cluster, Integer> {
}
