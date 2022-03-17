package org.silentsoft.hits.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.silentsoft.hits.item.HitsItem;
import org.silentsoft.hits.repository.HitsHostsRepository;
import org.silentsoft.hits.repository.HitsUrnsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
public class PreviewServiceTest {

    @Autowired
    private HitsUrnsRepository hitsUrnsRepository;

    @Autowired
    private HitsHostsRepository hitsHostsRepository;

    @Autowired
    private PreviewService previewService;

    @Test
    public void previewTest() {
        Assertions.assertNull(hitsUrnsRepository.findByUrn("preview.hits.sh/test"));
        Assertions.assertNull(hitsHostsRepository.findByHost("preview.hits.sh"));

        previewService.preview(new HitsItem(null, "preview.hits.sh/test", "total", "flat", "hits", "#4c1", "#555", null, null, 0, null));

        // preview request is not saved.
        Assertions.assertNull(hitsUrnsRepository.findByUrn("preview.hits.sh/test"));
        Assertions.assertNull(hitsHostsRepository.findByHost("preview.hits.sh"));
    }

}
