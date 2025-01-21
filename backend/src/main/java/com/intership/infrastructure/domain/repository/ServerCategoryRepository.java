package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.ServerCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerCategoryRepository extends JpaRepository<ServerCategory, Integer> {
}
