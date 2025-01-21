package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerRepository extends JpaRepository<Server, Integer> {
}
