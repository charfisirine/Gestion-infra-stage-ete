package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ServerCategoryDTO;
import java.util.List;

public interface ServerCategoryService {
    ServerCategoryDTO createServerCategory(ServerCategoryDTO serverCategoryDTO);
    ServerCategoryDTO getServerCategoryById(Integer id);
    List<ServerCategoryDTO> getAllServerCategories();
    ServerCategoryDTO updateServerCategory(Integer id, ServerCategoryDTO serverCategoryDTO);
    void deleteServerCategory(Integer id);
}
