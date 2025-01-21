package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.ClusterDTO;
import com.intership.infrastructure.services.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/clusters")
@RequiredArgsConstructor
public class ClusterController {

    private final ClusterService clusterService;

    @PostMapping
    public ResponseEntity<ClusterDTO> createCluster(@RequestBody ClusterDTO clusterDTO) {
        ClusterDTO createdCluster = clusterService.createCluster(clusterDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdCluster.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdCluster);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClusterDTO> getClusterById(@PathVariable Integer id) {
        return ResponseEntity.ok(clusterService.getClusterById(id));
    }

    @GetMapping
    public ResponseEntity<List<ClusterDTO>> getAllClusters() {
        return ResponseEntity.ok(clusterService.getAllClusters());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClusterDTO> updateCluster(@PathVariable Integer id, @RequestBody ClusterDTO clusterDTO) {
        return ResponseEntity.ok(clusterService.updateCluster(id, clusterDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCluster(@PathVariable Integer id) {
        clusterService.deleteCluster(id);
        return ResponseEntity.noContent().build();
    }
}
