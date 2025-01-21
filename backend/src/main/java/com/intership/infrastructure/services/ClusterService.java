package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ClusterDTO;
import java.util.List;

public interface ClusterService {
    ClusterDTO createCluster(ClusterDTO clusterDTO);
    ClusterDTO getClusterById(Integer id);
    List<ClusterDTO> getAllClusters();
    ClusterDTO updateCluster(Integer id, ClusterDTO clusterDTO);
    void deleteCluster(Integer id);
}
