package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ServerDTO;
import java.util.List;

public interface ServerService {
    ServerDTO createServer(ServerDTO serverDTO);
    ServerDTO getServerById(Integer id);
    List<ServerDTO> getAllServers();
    ServerDTO updateServer(Integer id, ServerDTO serverDTO);
    void deleteServer(Integer id);
}
