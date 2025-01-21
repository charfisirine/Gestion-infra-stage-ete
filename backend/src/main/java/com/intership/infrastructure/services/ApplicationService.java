package com.intership.infrastructure.services;

import com.intership.infrastructure.payload.dto.ApplicationDTO;
import java.util.List;

public interface ApplicationService {
    ApplicationDTO createApplication(ApplicationDTO applicationDTO);
    ApplicationDTO getApplicationById(Integer id);
    List<ApplicationDTO> getAllApplications();
    ApplicationDTO updateApplication(Integer id, ApplicationDTO applicationDTO);
    void deleteApplication(Integer id);
}
