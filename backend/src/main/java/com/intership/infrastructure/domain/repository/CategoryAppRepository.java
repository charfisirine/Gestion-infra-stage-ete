package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.services.impl.CategoryApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryAppRepository extends JpaRepository<CategoryApp, Integer> {
}
