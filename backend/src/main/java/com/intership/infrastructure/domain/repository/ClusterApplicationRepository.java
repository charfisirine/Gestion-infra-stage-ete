package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.ClusterApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClusterApplicationRepository extends JpaRepository<ClusterApplication, Integer> {
}
