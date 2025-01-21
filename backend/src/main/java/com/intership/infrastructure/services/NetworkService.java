package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.NetworkDTO;
import java.util.List;

public interface NetworkService {
    NetworkDTO createNetwork(NetworkDTO networkDTO);
    NetworkDTO getNetworkById(Integer id);
    List<NetworkDTO> getAllNetworks();
    NetworkDTO updateNetwork(Integer id, NetworkDTO networkDTO);
    void deleteNetwork(Integer id);
}
