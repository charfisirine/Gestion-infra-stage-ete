package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.Network;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetworkRepository extends JpaRepository<Network, Integer> {
}
