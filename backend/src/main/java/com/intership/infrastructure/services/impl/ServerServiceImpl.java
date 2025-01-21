package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Server;
import com.intership.infrastructure.domain.entity.ServerCategory;
import com.intership.infrastructure.domain.entity.Cluster;
import com.intership.infrastructure.domain.entity.Subnet;
import com.intership.infrastructure.domain.repository.ServerRepository;
import com.intership.infrastructure.domain.repository.ServerCategoryRepository;
import com.intership.infrastructure.domain.repository.ClusterRepository;
import com.intership.infrastructure.domain.repository.SubnetRepository;
import com.intership.infrastructure.payload.dto.ServerDTO;
import com.intership.infrastructure.services.ServerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;
    private final ServerCategoryRepository serverCategoryRepository;
    private final ClusterRepository clusterRepository;
    private final SubnetRepository subnetRepository;

    @Override
    @Transactional
    public ServerDTO createServer(ServerDTO serverDTO) {
        // Fetch related entities
        ServerCategory serverCategory = serverCategoryRepository.findById(serverDTO.getServerCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("ServerCategory with ID " + serverDTO.getServerCategoryId() + " not found"));

        Cluster cluster = clusterRepository.findById(serverDTO.getClusterId())
                .orElseThrow(() -> new EntityNotFoundException("Cluster with ID " + serverDTO.getClusterId() + " not found"));

        Subnet subnet = subnetRepository.findById(serverDTO.getSubnetId())
                .orElseThrow(() -> new EntityNotFoundException("Subnet with ID " + serverDTO.getSubnetId() + " not found"));

        // Create the server entity
        Server server = Server.builder()
                .hostName(serverDTO.getHostName())
                .addressIp(serverDTO.getAddressIp())
                .status(serverDTO.getStatus())
                .specification(serverDTO.getSpecification())
                .serverCategory(serverCategory)
                .cluster(cluster)
                .subnet(subnet)
                .build();

        server = serverRepository.save(server);
        return mapToDTO(server);
    }

    @Override
    @Transactional(readOnly = true)
    public ServerDTO getServerById(Integer id) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Server with ID " + id + " not found"));
        return mapToDTO(server);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServerDTO> getAllServers() {
        return serverRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServerDTO updateServer(Integer id, ServerDTO serverDTO) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Server with ID " + id + " not found"));

        // Fetch related entities
        ServerCategory serverCategory = serverCategoryRepository.findById(serverDTO.getServerCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("ServerCategory with ID " + serverDTO.getServerCategoryId() + " not found"));

        Cluster cluster = clusterRepository.findById(serverDTO.getClusterId())
                .orElseThrow(() -> new EntityNotFoundException("Cluster with ID " + serverDTO.getClusterId() + " not found"));

        Subnet subnet = subnetRepository.findById(serverDTO.getSubnetId())
                .orElseThrow(() -> new EntityNotFoundException("Subnet with ID " + serverDTO.getSubnetId() + " not found"));

        // Update the server entity
        server.setHostName(serverDTO.getHostName());
        server.setAddressIp(serverDTO.getAddressIp());
        server.setStatus(serverDTO.getStatus());
        server.setSpecification(serverDTO.getSpecification());
        server.setServerCategory(serverCategory);
        server.setCluster(cluster);
        server.setSubnet(subnet);

        server = serverRepository.save(server);
        return mapToDTO(server);
    }

    @Override
    @Transactional
    public void deleteServer(Integer id) {
        if (!serverRepository.existsById(id)) {
            throw new EntityNotFoundException("Server with ID " + id + " not found");
        }
        serverRepository.deleteById(id);
    }

    private ServerDTO mapToDTO(Server server) {
        return ServerDTO.builder()
                .id(server.getId())
                .hostName(server.getHostName())
                .addressIp(server.getAddressIp())
                .status(server.getStatus())
                .specification(server.getSpecification())
                .serverCategoryId(server.getServerCategory().getId())
                .clusterId(server.getCluster().getId())
                .subnetId(server.getSubnet().getId())
                .build();
    }
}
