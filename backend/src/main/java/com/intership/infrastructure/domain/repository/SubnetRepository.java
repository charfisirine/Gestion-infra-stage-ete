package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.Subnet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubnetRepository extends JpaRepository<Subnet, Integer> {
}
