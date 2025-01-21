package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.ServerCategory;
import com.intership.infrastructure.domain.repository.ServerCategoryRepository;
import com.intership.infrastructure.payload.dto.ServerCategoryDTO;
import com.intership.infrastructure.services.ServerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServerCategoryServiceImpl implements ServerCategoryService {

    private final ServerCategoryRepository serverCategoryRepository;

    @Override
    public ServerCategoryDTO createServerCategory(ServerCategoryDTO serverCategoryDTO) {
        ServerCategory serverCategory = ServerCategory.builder()
                .name(serverCategoryDTO.getName())
                .description(serverCategoryDTO.getDescription())
                .build();
        serverCategory = serverCategoryRepository.save(serverCategory);
        return mapToDTO(serverCategory);
    }

    @Override
    public ServerCategoryDTO getServerCategoryById(Integer id) {
        ServerCategory serverCategory = serverCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Server Category not found"));
        return mapToDTO(serverCategory);
    }

    @Override
    public List<ServerCategoryDTO> getAllServerCategories() {
        return serverCategoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServerCategoryDTO updateServerCategory(Integer id, ServerCategoryDTO serverCategoryDTO) {
        ServerCategory serverCategory = serverCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Server Category not found"));

        serverCategory.setName(serverCategoryDTO.getName());
        serverCategory.setDescription(serverCategoryDTO.getDescription());

        serverCategory = serverCategoryRepository.save(serverCategory);
        return mapToDTO(serverCategory);
    }

    @Override
    public void deleteServerCategory(Integer id) {
        serverCategoryRepository.deleteById(id);
    }

    private ServerCategoryDTO mapToDTO(ServerCategory serverCategory) {
        return ServerCategoryDTO.builder()
                .id(serverCategory.getId())
                .name(serverCategory.getName())
                .description(serverCategory.getDescription())
                .build();
    }
}
