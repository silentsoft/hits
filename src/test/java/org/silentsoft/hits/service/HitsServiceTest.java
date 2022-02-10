package org.silentsoft.hits.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.silentsoft.hits.entity.HitsHostsEntity;
import org.silentsoft.hits.entity.HitsHostsStatisticsEntity;
import org.silentsoft.hits.entity.HitsUrnsEntity;
import org.silentsoft.hits.entity.HitsUrnsStatisticsEntity;
import org.silentsoft.hits.item.HitsItem;
import org.silentsoft.hits.repository.HitsHostsRepository;
import org.silentsoft.hits.repository.HitsHostsStatisticsRepository;
import org.silentsoft.hits.repository.HitsUrnsRepository;
import org.silentsoft.hits.repository.HitsUrnsStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
public class HitsServiceTest {

    @Autowired
    private HitsUrnsRepository hitsUrnsRepository;

    @Autowired
    private HitsUrnsStatisticsRepository hitsUrnsStatisticsRepository;

    @Autowired
    private HitsHostsRepository hitsHostsRepository;

    @Autowired
    private HitsHostsStatisticsRepository hitsHostsStatisticsRepository;

    @Autowired
    private HitsService hitsService;

    @Test
    public void hitsTest() {
        Assertions.assertNull(hitsUrnsRepository.findByUrn("hits.sh/test"));
        Assertions.assertNull(hitsHostsRepository.findByHost("hits.sh"));

        hitsService.hits(new HitsItem(null, "hits.sh/test", "total", "flat", "hits", "#4c1", "#555", null, null, 0, null));
        {
            HitsUrnsEntity urnsEntity = hitsUrnsRepository.findByUrn("hits.sh/test");
            Assertions.assertNotNull(urnsEntity);
            long urnsCount = hitsUrnsStatisticsRepository.findById_UrnId(urnsEntity.getUrnId()).stream().mapToLong(HitsUrnsStatisticsEntity::getCount).sum();
            Assertions.assertEquals(1, urnsCount);

            HitsHostsEntity hostsEntity = hitsHostsRepository.findByHost("hits.sh");
            Assertions.assertNotNull(hostsEntity);
            long hostsCount = hitsHostsStatisticsRepository.findById_HostId(hostsEntity.getHostId()).stream().mapToLong(HitsHostsStatisticsEntity::getCount).sum();
            Assertions.assertEquals(1, hostsCount);
        }

        hitsService.hits(new HitsItem(null, "hits.sh/test", "total", "flat", "hits", "#4c1", "#555", null, null, 0, null));
        {
            HitsUrnsEntity urnsEntity = hitsUrnsRepository.findByUrn("hits.sh/test");
            Assertions.assertNotNull(urnsEntity);
            long urnsCount = hitsUrnsStatisticsRepository.findById_UrnId(urnsEntity.getUrnId()).stream().mapToLong(HitsUrnsStatisticsEntity::getCount).sum();
            Assertions.assertEquals(2, urnsCount);

            HitsHostsEntity hostsEntity = hitsHostsRepository.findByHost("hits.sh");
            Assertions.assertNotNull(hostsEntity);
            long hostsCount = hitsHostsStatisticsRepository.findById_HostId(hostsEntity.getHostId()).stream().mapToLong(HitsHostsStatisticsEntity::getCount).sum();
            Assertions.assertEquals(2, hostsCount);
        }
    }

}
