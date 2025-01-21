package com.intership.infrastructure.services.impl;

import com.intership.infrastructure.domain.entity.Application;
import com.intership.infrastructure.services.ApplicationService;
import com.intership.infrastructure.domain.repository.ApplicationRepository;
import com.intership.infrastructure.domain.repository.CategoryAppRepository;
import com.intership.infrastructure.payload.dto.ApplicationDTO;
import com.intership.infrastructure.payload.dto.CategoryAppDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CategoryAppRepository categoryAppRepository;

    @Override
    @Transactional
    public ApplicationDTO createApplication(ApplicationDTO applicationDTO) {
        CategoryApp categoryApp = categoryAppRepository.findById(applicationDTO.getCategoryApp().getId())
                .orElseThrow(() -> new EntityNotFoundException("CategoryApp with ID " + applicationDTO.getCategoryApp() + " not found"));

        Application application = Application.builder()
                .name(applicationDTO.getName())
                .description(applicationDTO.getDescription())
                .categoryApp(categoryApp)
                .build();

        application = applicationRepository.save(application);
        return mapToDTO(application);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationDTO getApplicationById(Integer id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + id + " not found"));
        return mapToDTO(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ApplicationDTO updateApplication(Integer id, ApplicationDTO applicationDTO) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application with ID " + id + " not found"));

        CategoryApp categoryApp = categoryAppRepository.findById(applicationDTO.getCategoryApp().getId())
                .orElseThrow(() -> new EntityNotFoundException("CategoryApp with ID " + applicationDTO.getCategoryApp() + " not found"));

        application.setName(applicationDTO.getName());
        application.setDescription(applicationDTO.getDescription());
        application.setCategoryApp(categoryApp);

        application = applicationRepository.save(application);
        return mapToDTO(application);
    }

    @Override
    @Transactional
    public void deleteApplication(Integer id) {
        if (!applicationRepository.existsById(id)) {
            throw new EntityNotFoundException("Application with ID " + id + " not found");
        }
        applicationRepository.deleteById(id);
    }

    private ApplicationDTO mapToDTO(Application application) {
        return ApplicationDTO.builder()
                .id(application.getId())
                .name(application.getName())
                .description(application.getDescription())
                .categoryApp(new CategoryAppDTO(
                        application.getCategoryApp().getId(),
                        application.getCategoryApp().getName(),
                        application.getCategoryApp().getDescription()
                ))
                .build();
    }
}
