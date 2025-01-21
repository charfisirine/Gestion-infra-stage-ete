package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.ServerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerApplicationRepository extends JpaRepository<ServerApplication, Integer> {
}
