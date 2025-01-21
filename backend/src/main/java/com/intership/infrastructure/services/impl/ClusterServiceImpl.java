package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Cluster;
import com.intership.infrastructure.domain.repository.ClusterRepository;
import com.intership.infrastructure.payload.dto.ClusterDTO;
import com.intership.infrastructure.services.ClusterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClusterServiceImpl implements ClusterService {

    private final ClusterRepository clusterRepository;

    @Override
    public ClusterDTO createCluster(ClusterDTO clusterDTO) {
        Cluster cluster = Cluster.builder()
                .designation(clusterDTO.getDesignation())
                .description(clusterDTO.getDescription())
                .type(clusterDTO.getType())
                .role(clusterDTO.getRole())
                .status(clusterDTO.getStatus())
                .location(clusterDTO.getLocation())
                .build();
        cluster = clusterRepository.save(cluster);
        return mapToDTO(cluster);
    }

    @Override
    public ClusterDTO getClusterById(Integer id) {
        Cluster cluster = clusterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cluster not found"));
        return mapToDTO(cluster);
    }

    @Override
    public List<ClusterDTO> getAllClusters() {
        return clusterRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClusterDTO updateCluster(Integer id, ClusterDTO clusterDTO) {
        Cluster cluster = clusterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cluster not found"));

        cluster.setDesignation(clusterDTO.getDesignation());
        cluster.setDescription(clusterDTO.getDescription());
        cluster.setType(clusterDTO.getType());
        cluster.setRole(clusterDTO.getRole());
        cluster.setStatus(clusterDTO.getStatus());
        cluster.setLocation(clusterDTO.getLocation());

        cluster = clusterRepository.save(cluster);
        return mapToDTO(cluster);
    }

    @Override
    public void deleteCluster(Integer id) {
        clusterRepository.deleteById(id);
    }

    private ClusterDTO mapToDTO(Cluster cluster) {
        return ClusterDTO.builder()
                .id(cluster.getId())
                .designation(cluster.getDesignation())
                .description(cluster.getDescription())
                .type(cluster.getType())
                .role(cluster.getRole())
                .status(cluster.getStatus())
                .location(cluster.getLocation())
                .build();
    }
}
