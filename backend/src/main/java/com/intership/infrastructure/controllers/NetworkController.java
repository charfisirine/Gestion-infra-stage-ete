package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.NetworkDTO;
import com.intership.infrastructure.services.NetworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/networks")
@RequiredArgsConstructor
public class NetworkController {

    private final NetworkService networkService;

    @PostMapping
    public ResponseEntity<NetworkDTO> createNetwork(@RequestBody NetworkDTO networkDTO) {
        NetworkDTO createdNetwork = networkService.createNetwork(networkDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdNetwork.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdNetwork);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NetworkDTO> getNetworkById(@PathVariable Integer id) {
        return ResponseEntity.ok(networkService.getNetworkById(id));
    }

    @GetMapping
    public ResponseEntity<List<NetworkDTO>> getAllNetworks() {
        return ResponseEntity.ok(networkService.getAllNetworks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NetworkDTO> updateNetwork(@PathVariable Integer id, @RequestBody NetworkDTO networkDTO) {
        return ResponseEntity.ok(networkService.updateNetwork(id, networkDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNetwork(@PathVariable Integer id) {
        networkService.deleteNetwork(id);
        return ResponseEntity.noContent().build();
    }
}
