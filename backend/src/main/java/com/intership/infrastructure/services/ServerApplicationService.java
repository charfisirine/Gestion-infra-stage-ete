package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ServerApplicationDTO;

import java.util.List;

public interface ServerApplicationService {
    ServerApplicationDTO createServerApplication(ServerApplicationDTO serverApplicationDTO);

    ServerApplicationDTO getServerApplicationById(Integer id);

    List<ServerApplicationDTO> getAllServerApplications();

    ServerApplicationDTO updateServerApplication(Integer id, ServerApplicationDTO serverApplicationDTO);

    void deleteServerApplication(Integer id);
}