package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Network;
import com.intership.infrastructure.domain.entity.Site;
import com.intership.infrastructure.domain.repository.NetworkRepository;
import com.intership.infrastructure.domain.repository.SiteRepository;
import com.intership.infrastructure.payload.dto.NetworkDTO;
import com.intership.infrastructure.payload.dto.SiteDTO;
import com.intership.infrastructure.services.NetworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NetworkServiceImpl implements NetworkService {

    private final NetworkRepository networkRepository;
    private final SiteRepository siteRepository;

    @Override
    public NetworkDTO createNetwork(NetworkDTO networkDTO) {
        Site site = siteRepository.findById(networkDTO.getSite().getId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        Network network = Network.builder()
                .name(networkDTO.getName())
                .ipRange(networkDTO.getIpRange())
                .networkType(networkDTO.getNetworkType())
                .site(site)
                .build();

        network = networkRepository.save(network);
        return mapToDTO(network);
    }

    @Override
    public NetworkDTO getNetworkById(Integer id) {
        Network network = networkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Network not found"));
        return mapToDTO(network);
    }

    @Override
    public List<NetworkDTO> getAllNetworks() {
        return networkRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NetworkDTO updateNetwork(Integer id, NetworkDTO networkDTO) {
        Network network = networkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Network not found"));

        network.setName(networkDTO.getName());
        network.setIpRange(networkDTO.getIpRange());
        network.setNetworkType(networkDTO.getNetworkType());

        network = networkRepository.save(network);
        return mapToDTO(network);
    }

    @Override
    public void deleteNetwork(Integer id) {
        networkRepository.deleteById(id);
    }

    private NetworkDTO mapToDTO(Network network) {
        return NetworkDTO.builder()
                .id(network.getId())
                .name(network.getName())
                .ipRange(network.getIpRange())
                .networkType(network.getNetworkType())
                .site(network.getSite() != null ? mapSiteToDTO(network.getSite()) : null)
                .build();
    }

    private SiteDTO mapSiteToDTO(Site site) {
        return SiteDTO.builder()
                .id(site.getId())
                .designation(site.getDesignation())
                .build();
    }
}
