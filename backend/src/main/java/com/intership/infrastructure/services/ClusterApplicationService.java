package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ClusterApplicationDTO;

import java.util.List;

public interface ClusterApplicationService {
    ClusterApplicationDTO createClusterApplication(ClusterApplicationDTO clusterApplicationDTO);

    ClusterApplicationDTO getClusterApplicationById(Integer id);

    List<ClusterApplicationDTO> getAllClusterApplications();

    ClusterApplicationDTO updateClusterApplication(Integer id, ClusterApplicationDTO clusterApplicationDTO);

    void deleteClusterApplication(Integer id);
}
