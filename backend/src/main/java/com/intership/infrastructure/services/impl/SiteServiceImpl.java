package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Site;
import com.intership.infrastructure.domain.repository.SiteRepository;
import com.intership.infrastructure.payload.dto.SiteDTO;
import com.intership.infrastructure.services.SiteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SiteServiceImpl implements SiteService {
    private final SiteRepository siteRepository;
    private final ModelMapper modelMapper;

    @Override
    public SiteDTO createSite(SiteDTO siteDTO) {
        Site site = modelMapper.map(siteDTO, Site.class);
        site = siteRepository.save(site);
        return modelMapper.map(site, SiteDTO.class);
    }

    @Override
    public List<SiteDTO> getAllSites() {
        return siteRepository.findAll().stream()
                .map(site -> modelMapper.map(site, SiteDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SiteDTO getSiteById(Integer id) {
        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + id));
        return modelMapper.map(site, SiteDTO.class);
    }

    @Override
    public SiteDTO updateSite(Integer id, SiteDTO siteDTO) {
        Site existingSite = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found"));
        modelMapper.map(siteDTO, existingSite); // Map only the updated fields
        Site updatedSite = siteRepository.save(existingSite);
        return modelMapper.map(updatedSite, SiteDTO.class);
    }

    @Override
    public void deleteSite(Integer id) {
        if (!siteRepository.existsById(id)) {
            throw new RuntimeException("Site not found with id: " + id);
        }
        siteRepository.deleteById(id);
    }
}