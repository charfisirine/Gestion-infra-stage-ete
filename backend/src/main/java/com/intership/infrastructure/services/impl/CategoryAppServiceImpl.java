package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.repository.CategoryAppRepository;
import com.intership.infrastructure.payload.dto.CategoryAppDTO;
import com.intership.infrastructure.services.CategoryAppService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryAppServiceImpl implements CategoryAppService {

    private final CategoryAppRepository categoryAppRepository;

    @Override
    @Transactional
    public CategoryAppDTO createCategoryApp(CategoryAppDTO categoryAppDTO) {
        CategoryApp categoryApp = CategoryApp.builder()
                .name(categoryAppDTO.getName())
                .description(categoryAppDTO.getDescription())
                .build();
        categoryApp = categoryAppRepository.save(categoryApp);
        return mapToDTO(categoryApp);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryAppDTO getCategoryAppById(Integer id) {
        CategoryApp categoryApp = categoryAppRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CategoryApp with ID " + id + " not found"));
        return mapToDTO(categoryApp);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryAppDTO> getAllCategoryApps() {
        return categoryAppRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryAppDTO updateCategoryApp(Integer id, CategoryAppDTO categoryAppDTO) {
        CategoryApp categoryApp = categoryAppRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CategoryApp with ID " + id + " not found"));

        categoryApp.setName(categoryAppDTO.getName());
        categoryApp.setDescription(categoryAppDTO.getDescription());

        categoryApp = categoryAppRepository.save(categoryApp);
        return mapToDTO(categoryApp);
    }

    @Override
    @Transactional
    public void deleteCategoryApp(Integer id) {
        if (!categoryAppRepository.existsById(id)) {
            throw new EntityNotFoundException("CategoryApp with ID " + id + " not found");
        }
        categoryAppRepository.deleteById(id);
    }

    private CategoryAppDTO mapToDTO(CategoryApp categoryApp) {
        return new CategoryAppDTO(
                categoryApp.getId(),
                categoryApp.getName(),
                categoryApp.getDescription()
        );
    }
}
