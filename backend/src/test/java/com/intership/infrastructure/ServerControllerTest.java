package com.intership.infrastructure;

import com.intership.infrastructure.controllers.ServerController;
import com.intership.infrastructure.payload.dto.ServerDTO;
import com.intership.infrastructure.services.ServerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ServerControllerTest {

    @InjectMocks
    private ServerController serverController;

    @Mock
    private ServerService serverService;

    private ServerDTO serverDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        serverDTO = ServerDTO.builder()
                .id(1)
                .hostName("Test Server")
                .addressIp("192.168.1.1")
                .status("ACTIVE")
                .specification("16GB RAM")
                .build();
    }

    @Test
    void testCreateServer() {
        when(serverService.createServer(any(ServerDTO.class))).thenReturn(serverDTO);

        ResponseEntity<ServerDTO> response = serverController.createServer(serverDTO);

        assertNotNull(response.getBody());
        assertEquals(serverDTO.getId(), response.getBody().getId());
        verify(serverService, times(1)).createServer(any(ServerDTO.class));
    }

    @Test
    void testGetServerById() {
        when(serverService.getServerById(1)).thenReturn(serverDTO);

        ResponseEntity<ServerDTO> response = serverController.getServerById(1);

        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getId());
        verify(serverService, times(1)).getServerById(1);
    }

    @Test
    void testGetAllServers() {
        List<ServerDTO> servers = Arrays.asList(serverDTO);
        when(serverService.getAllServers()).thenReturn(servers);

        ResponseEntity<List<ServerDTO>> response = serverController.getAllServers();

        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(serverService, times(1)).getAllServers();
    }

    @Test
    void testUpdateServer() {
        when(serverService.updateServer(eq(1), any(ServerDTO.class))).thenReturn(serverDTO);

        ResponseEntity<ServerDTO> response = serverController.updateServer(1, serverDTO);

        assertNotNull(response.getBody());
        assertEquals("Test Server", response.getBody().getHostName());
        verify(serverService, times(1)).updateServer(eq(1), any(ServerDTO.class));
    }

    @Test
    void testDeleteServer() {
        doNothing().when(serverService).deleteServer(1);

        ResponseEntity<Void> response = serverController.deleteServer(1);

        assertEquals(204, response.getStatusCodeValue());
        verify(serverService, times(1)).deleteServer(1);
    }
}
