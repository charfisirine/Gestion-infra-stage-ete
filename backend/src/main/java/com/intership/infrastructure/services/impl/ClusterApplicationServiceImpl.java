package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Application;
import com.intership.infrastructure.domain.entity.Cluster;
import com.intership.infrastructure.domain.entity.ClusterApplication;
import com.intership.infrastructure.domain.repository.ApplicationRepository;
import com.intership.infrastructure.domain.repository.ClusterApplicationRepository;
import com.intership.infrastructure.domain.repository.ClusterRepository;
import com.intership.infrastructure.payload.dto.ClusterApplicationDTO;
import com.intership.infrastructure.services.ClusterApplicationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClusterApplicationServiceImpl implements ClusterApplicationService {

    private final ClusterApplicationRepository clusterApplicationRepository;
    private final ApplicationRepository applicationRepository;
    private final ClusterRepository clusterRepository;

    @Override
    @Transactional
    public ClusterApplicationDTO createClusterApplication(ClusterApplicationDTO clusterApplicationDTO) {
        // Fetch related entities
        Application application = applicationRepository.findById(clusterApplicationDTO.getApplicationId())
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + clusterApplicationDTO.getApplicationId() + " not found"));

        Cluster cluster = clusterRepository.findById(clusterApplicationDTO.getClusterId())
                .orElseThrow(() -> new EntityNotFoundException("Cluster with ID " + clusterApplicationDTO.getClusterId() + " not found"));

        // Create and persist ClusterApplication
        ClusterApplication clusterApplication = ClusterApplication.builder()
                .application(application)
                .cluster(cluster)
                .status(clusterApplicationDTO.getStatus())
                .build();
        clusterApplication = clusterApplicationRepository.save(clusterApplication);

        return mapToDTO(clusterApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public ClusterApplicationDTO getClusterApplicationById(Integer id) {
        ClusterApplication clusterApplication = clusterApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cluster Application with ID " + id + " not found"));
        return mapToDTO(clusterApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClusterApplicationDTO> getAllClusterApplications() {
        return clusterApplicationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ClusterApplicationDTO updateClusterApplication(Integer id, ClusterApplicationDTO clusterApplicationDTO) {
        ClusterApplication clusterApplication = clusterApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cluster Application with ID " + id + " not found"));

        // Fetch related entities
        Application application = applicationRepository.findById(clusterApplicationDTO.getApplicationId())
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + clusterApplicationDTO.getApplicationId() + " not found"));

        Cluster cluster = clusterRepository.findById(clusterApplicationDTO.getClusterId())
                .orElseThrow(() -> new EntityNotFoundException("Cluster with ID " + clusterApplicationDTO.getClusterId() + " not found"));

        // Update entity
        clusterApplication.setApplication(application);
        clusterApplication.setCluster(cluster);
        clusterApplication.setStatus(clusterApplicationDTO.getStatus());

        clusterApplication = clusterApplicationRepository.save(clusterApplication);
        return mapToDTO(clusterApplication);
    }

    @Override
    @Transactional
    public void deleteClusterApplication(Integer id) {
        if (!clusterApplicationRepository.existsById(id)) {
            throw new EntityNotFoundException("Cluster Application with ID " + id + " not found");
        }
        clusterApplicationRepository.deleteById(id);
    }

    private ClusterApplicationDTO mapToDTO(ClusterApplication clusterApplication) {
        return ClusterApplicationDTO.builder()
                .id(clusterApplication.getId())
                .applicationId(clusterApplication.getApplication().getId())
                .clusterId(clusterApplication.getCluster().getId())
                .status(clusterApplication.getStatus())
                .build();
    }
}
