package com.intership.infrastructure.domain.repository;

import com.intership.infrastructure.domain.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, Integer> {
}
