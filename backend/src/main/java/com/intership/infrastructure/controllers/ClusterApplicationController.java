package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.ClusterApplicationDTO;
import com.intership.infrastructure.services.ClusterApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/cluster-applications")
@RequiredArgsConstructor
public class ClusterApplicationController {

    private final ClusterApplicationService clusterApplicationService;

    @PostMapping
    public ResponseEntity<ClusterApplicationDTO> createClusterApplication(@RequestBody ClusterApplicationDTO clusterApplicationDTO) {
        ClusterApplicationDTO createdClusterApplication = clusterApplicationService.createClusterApplication(clusterApplicationDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdClusterApplication.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdClusterApplication);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClusterApplicationDTO> getClusterApplicationById(@PathVariable Integer id) {
        return ResponseEntity.ok(clusterApplicationService.getClusterApplicationById(id));
    }

    @GetMapping
    public ResponseEntity<List<ClusterApplicationDTO>> getAllClusterApplications() {
        return ResponseEntity.ok(clusterApplicationService.getAllClusterApplications());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClusterApplicationDTO> updateClusterApplication(@PathVariable Integer id, @RequestBody ClusterApplicationDTO clusterApplicationDTO) {
        return ResponseEntity.ok(clusterApplicationService.updateClusterApplication(id, clusterApplicationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClusterApplication(@PathVariable Integer id) {
        clusterApplicationService.deleteClusterApplication(id);
        return ResponseEntity.noContent().build();
    }
}
