package com.intership.infrastructure.controllers;

import com.intership.infrastructure.payload.dto.ServerCategoryDTO;
import com.intership.infrastructure.services.ServerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/server-categories")
@RequiredArgsConstructor
public class ServerCategoryController {

    private final ServerCategoryService serverCategoryService;

    @PostMapping
    public ResponseEntity<ServerCategoryDTO> createServerCategory(@RequestBody ServerCategoryDTO serverCategoryDTO) {
        ServerCategoryDTO createdServerCategory = serverCategoryService.createServerCategory(serverCategoryDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdServerCategory.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdServerCategory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServerCategoryDTO> getServerCategoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(serverCategoryService.getServerCategoryById(id));
    }

    @GetMapping
    public ResponseEntity<List<ServerCategoryDTO>> getAllServerCategories() {
        return ResponseEntity.ok(serverCategoryService.getAllServerCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServerCategoryDTO> updateServerCategory(@PathVariable Integer id, @RequestBody ServerCategoryDTO serverCategoryDTO) {
        return ResponseEntity.ok(serverCategoryService.updateServerCategory(id, serverCategoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServerCategory(@PathVariable Integer id) {
        serverCategoryService.deleteServerCategory(id);
        return ResponseEntity.noContent().build();
    }
}
