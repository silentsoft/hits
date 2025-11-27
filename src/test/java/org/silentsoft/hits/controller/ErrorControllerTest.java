package org.silentsoft.hits.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.RequestDispatcher;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class ErrorControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void shouldReturnErrorBadgeWith404() throws Exception {
        mvc.perform(get("/error")
                .requestAttr(RequestDispatcher.ERROR_STATUS_CODE, 404))
                .andExpect(status().isOk())
                .andExpect(content().contentType("image/svg+xml;charset=UTF-8"))
                .andExpect(content().string(containsString("404")))
                .andExpect(content().string(containsString("Not Found")));
    }

    @Test
    public void shouldReturnErrorBadgeWith500() throws Exception {
        mvc.perform(get("/error")
                .requestAttr(RequestDispatcher.ERROR_STATUS_CODE, 500))
                .andExpect(status().isOk())
                .andExpect(content().contentType("image/svg+xml;charset=UTF-8"))
                .andExpect(content().string(containsString("Internal Server Error")));
    }

    @Test
    public void shouldReturnErrorBadgeWithInvalidStatusCode() throws Exception {
        mvc.perform(get("/error")
                .requestAttr(RequestDispatcher.ERROR_STATUS_CODE, "invalid"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("image/svg+xml;charset=UTF-8"))
                .andExpect(content().string(containsString("Internal Server Error")));
    }

}
