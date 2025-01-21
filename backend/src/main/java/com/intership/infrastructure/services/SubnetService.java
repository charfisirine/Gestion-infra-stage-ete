package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.SubnetDTO;
import java.util.List;

public interface SubnetService {
    SubnetDTO createSubnet(SubnetDTO subnetDTO);
    SubnetDTO getSubnetById(Integer id);
    List<SubnetDTO> getAllSubnets();
    SubnetDTO updateSubnet(Integer id, SubnetDTO subnetDTO);
    void deleteSubnet(Integer id);
}
