package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.SubnetDTO;
import com.intership.infrastructure.services.SubnetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/subnets")
@RequiredArgsConstructor
public class SubnetController {

    private final SubnetService subnetService;

    @PostMapping
    public ResponseEntity<SubnetDTO> createSubnet(@RequestBody SubnetDTO subnetDTO) {
        SubnetDTO createdSubnet = subnetService.createSubnet(subnetDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdSubnet.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdSubnet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubnetDTO> getSubnetById(@PathVariable Integer id) {
        return ResponseEntity.ok(subnetService.getSubnetById(id));
    }

    @GetMapping
    public ResponseEntity<List<SubnetDTO>> getAllSubnets() {
        return ResponseEntity.ok(subnetService.getAllSubnets());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubnetDTO> updateSubnet(@PathVariable Integer id, @RequestBody SubnetDTO subnetDTO) {
        return ResponseEntity.ok(subnetService.updateSubnet(id, subnetDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubnet(@PathVariable Integer id) {
        subnetService.deleteSubnet(id);
        return ResponseEntity.noContent().build();
    }
}
