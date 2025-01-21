package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Application;
import com.intership.infrastructure.domain.entity.Server;
import com.intership.infrastructure.domain.entity.ServerApplication;
import com.intership.infrastructure.domain.repository.ApplicationRepository;
import com.intership.infrastructure.domain.repository.ServerApplicationRepository;
import com.intership.infrastructure.domain.repository.ServerRepository;
import com.intership.infrastructure.payload.dto.ServerApplicationDTO;
import com.intership.infrastructure.services.ServerApplicationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServerApplicationServiceImpl implements ServerApplicationService {

    private final ServerApplicationRepository serverApplicationRepository;
    private final ServerRepository serverRepository;
    private final ApplicationRepository applicationRepository;

    @Override
    @Transactional
    public ServerApplicationDTO createServerApplication(ServerApplicationDTO serverApplicationDTO) {
        // Fetch related entities
        Server server = serverRepository.findById(serverApplicationDTO.getServerId())
                .orElseThrow(() -> new EntityNotFoundException("Server with ID " + serverApplicationDTO.getServerId() + " not found"));

        Application application = applicationRepository.findById(serverApplicationDTO.getApplicationId())
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + serverApplicationDTO.getApplicationId() + " not found"));

        // Create and save ServerApplication
        ServerApplication serverApplication = ServerApplication.builder()
                .purpose(serverApplicationDTO.getPurpose())
                .accessLink(serverApplicationDTO.getAccessLink())
                .server(server)
                .application(application)
                .build();
        serverApplication = serverApplicationRepository.save(serverApplication);

        return mapToDTO(serverApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public ServerApplicationDTO getServerApplicationById(Integer id) {
        ServerApplication serverApplication = serverApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ServerApplication with ID " + id + " not found"));
        return mapToDTO(serverApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServerApplicationDTO> getAllServerApplications() {
        return serverApplicationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServerApplicationDTO updateServerApplication(Integer id, ServerApplicationDTO serverApplicationDTO) {
        ServerApplication serverApplication = serverApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ServerApplication with ID " + id + " not found"));

        // Fetch related entities
        Server server = serverRepository.findById(serverApplicationDTO.getServerId())
                .orElseThrow(() -> new EntityNotFoundException("Server with ID " + serverApplicationDTO.getServerId() + " not found"));

        Application application = applicationRepository.findById(serverApplicationDTO.getApplicationId())
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + serverApplicationDTO.getApplicationId() + " not found"));

        // Update ServerApplication
        serverApplication.setPurpose(serverApplicationDTO.getPurpose());
        serverApplication.setAccessLink(serverApplicationDTO.getAccessLink());
        serverApplication.setServer(server);
        serverApplication.setApplication(application);

        serverApplication = serverApplicationRepository.save(serverApplication);
        return mapToDTO(serverApplication);
    }

    @Override
    @Transactional
    public void deleteServerApplication(Integer id) {
        if (!serverApplicationRepository.existsById(id)) {
            throw new EntityNotFoundException("ServerApplication with ID " + id + " not found");
        }
        serverApplicationRepository.deleteById(id);
    }

    private ServerApplicationDTO mapToDTO(ServerApplication serverApplication) {
        return ServerApplicationDTO.builder()
                .id(serverApplication.getId())
                .purpose(serverApplication.getPurpose())
                .accessLink(serverApplication.getAccessLink())
                .serverId(serverApplication.getServer().getId())
                .applicationId(serverApplication.getApplication().getId())
                .build();
    }
}
