package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.SiteDTO;

import java.util.List;

public interface SiteService {
    SiteDTO createSite(SiteDTO siteDTO);
    SiteDTO getSiteById(Integer id);
    List<SiteDTO> getAllSites();
    SiteDTO updateSite(Integer id, SiteDTO siteDTO);
    void deleteSite(Integer id);
}