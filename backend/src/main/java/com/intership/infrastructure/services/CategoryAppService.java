package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.CategoryAppDTO;

import java.util.List;

public interface CategoryAppService {
    CategoryAppDTO createCategoryApp(CategoryAppDTO categoryAppDTO);

    CategoryAppDTO getCategoryAppById(Integer id);

    List<CategoryAppDTO> getAllCategoryApps();

    CategoryAppDTO updateCategoryApp(Integer id, CategoryAppDTO categoryAppDTO);

    void deleteCategoryApp(Integer id);
}
