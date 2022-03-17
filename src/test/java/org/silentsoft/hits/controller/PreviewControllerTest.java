package org.silentsoft.hits.controller;

import org.junit.jupiter.api.Test;
import org.silentsoft.badge4j.Badge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class PreviewControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void previewTest() throws Exception {
        expectPreviewResult("/preview.test.com.preview", Badge.builder().label("hits").message("1").build());
        expectPreviewResult("/preview.test.com.preview?view=today-total", Badge.builder().label("hits").message("1 / 1").build());
        expectPreviewResult("/preview.test.com.preview?extraCount=10000", Badge.builder().label("hits").message("10,001").build());
    }

    private void expectPreviewResult(String url, String expected) throws Exception {
        for (int i=0; i<3; i++) {
            // preview request always returns the same result
            mvc.perform(asyncDispatch(mvc.perform(get(url)).andReturn())).andExpect(content().string(equalTo(expected)));
        }
    }
}
