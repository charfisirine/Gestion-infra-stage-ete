package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Subnet;
import com.intership.infrastructure.domain.entity.Network;
import com.intership.infrastructure.domain.repository.SubnetRepository;
import com.intership.infrastructure.domain.repository.NetworkRepository;
import com.intership.infrastructure.payload.dto.SubnetDTO;
import com.intership.infrastructure.services.SubnetService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubnetServiceImpl implements SubnetService {

    private final SubnetRepository subnetRepository;
    private final NetworkRepository networkRepository;

    @Override
    @Transactional
    public SubnetDTO createSubnet(SubnetDTO subnetDTO) {
        Network network = networkRepository.findById(subnetDTO.getNetworkId())
                .orElseThrow(() -> new EntityNotFoundException("Network with ID " + subnetDTO.getNetworkId() + " not found"));

        Subnet subnet = Subnet.builder()
                .cidrNotation(subnetDTO.getCidrNotation())
                .subnetMask(subnetDTO.getSubnetMask())
                .ipRange(subnetDTO.getIpRange())
                .gateway(subnetDTO.getGateway())
                .network(network)
                .build();
        subnet = subnetRepository.save(subnet);
        return mapToDTO(subnet);
    }

    @Override
    @Transactional(readOnly = true)
    public SubnetDTO getSubnetById(Integer id) {
        Subnet subnet = subnetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subnet with ID " + id + " not found"));
        return mapToDTO(subnet);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubnetDTO> getAllSubnets() {
        return subnetRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SubnetDTO updateSubnet(Integer id, SubnetDTO subnetDTO) {
        Subnet subnet = subnetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subnet with ID " + id + " not found"));

        Network network = networkRepository.findById(subnetDTO.getNetworkId())
                .orElseThrow(() -> new EntityNotFoundException("Network with ID " + subnetDTO.getNetworkId() + " not found"));

        subnet.setCidrNotation(subnetDTO.getCidrNotation());
        subnet.setSubnetMask(subnetDTO.getSubnetMask());
        subnet.setIpRange(subnetDTO.getIpRange());
        subnet.setGateway(subnetDTO.getGateway());
        subnet.setNetwork(network);

        subnet = subnetRepository.save(subnet);
        return mapToDTO(subnet);
    }

    @Override
    @Transactional
    public void deleteSubnet(Integer id) {
        if (!subnetRepository.existsById(id)) {
            throw new EntityNotFoundException("Subnet with ID " + id + " not found");
        }
        subnetRepository.deleteById(id);
    }

    private SubnetDTO mapToDTO(Subnet subnet) {
        return SubnetDTO.builder()
                .id(subnet.getId())
                .cidrNotation(subnet.getCidrNotation())
                .subnetMask(subnet.getSubnetMask())
                .ipRange(subnet.getIpRange())
                .gateway(subnet.getGateway())
                .networkId(subnet.getNetwork().getId())
                .build();
    }
}
