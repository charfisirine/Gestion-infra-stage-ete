package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.SiteDTO;
import com.intership.infrastructure.services.SiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/sites")
@RequiredArgsConstructor
public class SiteController {

    private final SiteService siteService;

    @PostMapping
    public ResponseEntity<SiteDTO> createSite(@RequestBody SiteDTO siteDTO) {
        SiteDTO createdSite = siteService.createSite(siteDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdSite.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdSite);
    }

    @GetMapping
    public ResponseEntity<List<SiteDTO>> getAllSites() {
        List<SiteDTO> sites = siteService.getAllSites();
        return ResponseEntity.ok(sites);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteDTO> getSiteById(@PathVariable Integer id) {
        SiteDTO siteDTO = siteService.getSiteById(id);
        return ResponseEntity.ok(siteDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SiteDTO> updateSite(@PathVariable Integer id, @RequestBody SiteDTO siteDTO) {
        SiteDTO updatedSite = siteService.updateSite(id, siteDTO);
        return ResponseEntity.ok(updatedSite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSite(@PathVariable Integer id) {
        siteService.deleteSite(id);
        return ResponseEntity.ok("Site deleted successfully.");
    }
}
