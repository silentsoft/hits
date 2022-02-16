package org.silentsoft.hits.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class ApiControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void basicTest() throws Exception {
        mvc.perform(get("/api/urns/foo.com/bar"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json; charset=utf-8"));
    }

    @Test
    public void redirectTest() throws Exception {
        mvc.perform(get("/api/urns/https:/redirect.com"))
                .andExpect(status().isMovedPermanently())
                .andExpect(header().string("Location", "/api/urns/redirect.com"));

        mvc.perform(get("/api/urns/https://redirect.com"))
                .andExpect(status().isMovedPermanently())
                .andExpect(header().string("Location", "/api/urns/redirect.com"));
    }

    @Test
    public void notFoundTest() throws Exception {
        mvc.perform(get("/api/urns")).andExpect(status().isNotFound());
        mvc.perform(get("/api/urns/")).andExpect(status().isNotFound());
        mvc.perform(get("/api/urns/bar.com/foo")).andExpect(status().isNotFound());
    }

    @Test
    public void badRequestTest() throws Exception {
        mvc.perform(get("/api/urns/not-contains-dot")).andExpect(status().isBadRequest());
    }

    @Test
    public void uriTooLongTest() throws Exception {
        String x240 = "xxxxxxxxxx".replaceAll("x", "xxxxxxxxxxxxxxxxxxxxxxxx");

        String x251 = x240.concat("xxxxxxx.com");

        mvc.perform(get(String.format("/api/urns/%s", x251))).andExpect(status().isUriTooLong());
    }

}
