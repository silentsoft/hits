package org.silentsoft.hits.service;

import org.silentsoft.badge4j.Badge;
import org.silentsoft.badge4j.Style;
import org.silentsoft.hits.entity.*;
import org.silentsoft.hits.item.HitsItem;
import org.silentsoft.hits.repository.*;
import org.silentsoft.hits.utils.UniformedResourceNameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.NumberFormat;
import java.util.Optional;

@Service
public class HitsService {

    @Autowired
    private HitsMigrationRepository hitsMigrationRepository;

    @Autowired
    private HitsUrnsRepository hitsUrnsRepository;

    @Autowired
    private HitsUrnsStatisticsRepository hitsUrnsStatisticsRepository;

    @Autowired
    private HitsHostsRepository hitsHostsRepository;

    @Autowired
    private HitsHostsStatisticsRepository hitsHostsStatisticsRepository;

    @Transactional(rollbackFor = Exception.class)
    public String hits(HitsItem item) {
        String urn = item.getUrn();
        String view = item.getView();
        String style = item.getStyle();
        String label = item.getLabel();
        String color = item.getColor();
        String labelColor = item.getLabelColor();
        String[] links = item.getLinks();
        String logo = item.getLogo();
        int logoWidth = item.getLogoWidth();
        Long extraCount = item.getExtraCount();

        long currentTimeMillis = System.currentTimeMillis();
        Date date = new Date(currentTimeMillis);
        Timestamp timestamp = new Timestamp(currentTimeMillis);

        HitsUrnsEntity urnsEntity = hitsUrnsRepository.findByUrn(urn);
        if (urnsEntity == null) {
            urnsEntity = new HitsUrnsEntity();
            urnsEntity.setUrn(urn);
            urnsEntity.setCreatedAt(timestamp);
            urnsEntity.setUpdatedAt(timestamp);
            urnsEntity = hitsUrnsRepository.save(urnsEntity);
        }

        HitsUrnsStatisticsEntity urnsStatisticsEntity;
        Optional<HitsUrnsStatisticsEntity> optionalHitsUrnsStatisticsEntity = hitsUrnsStatisticsRepository.findById(new HitsUrnsStatisticsId(urnsEntity.getUrnId(), date));
        if (optionalHitsUrnsStatisticsEntity.isPresent()) {
            urnsStatisticsEntity = optionalHitsUrnsStatisticsEntity.get();
            urnsStatisticsEntity.setCount(urnsStatisticsEntity.getCount() + 1);
        } else {
            urnsStatisticsEntity = new HitsUrnsStatisticsEntity();
            urnsStatisticsEntity.setId(new HitsUrnsStatisticsId(urnsEntity.getUrnId(), date));
            urnsStatisticsEntity.setCount(1);
            urnsStatisticsEntity.setCreatedAt(timestamp);
        }
        urnsStatisticsEntity.setUpdatedAt(timestamp);
        hitsUrnsStatisticsRepository.save(urnsStatisticsEntity);

        String host = UniformedResourceNameUtils.getHost(urn);
        HitsHostsEntity hostsEntity = hitsHostsRepository.findByHost(host);
        if (hostsEntity == null) {
            hostsEntity = new HitsHostsEntity();
            hostsEntity.setHost(host);
            hostsEntity.setCreatedAt(timestamp);
            hostsEntity.setUpdatedAt(timestamp);
            hostsEntity = hitsHostsRepository.save(hostsEntity);
        }

        HitsHostsStatisticsEntity hostsStatisticsEntity;
        Optional<HitsHostsStatisticsEntity> optionalHitsHostsStatisticsEntity = hitsHostsStatisticsRepository.findById(new HitsHostsStatisticsId(hostsEntity.getHostId(), date));
        if (optionalHitsHostsStatisticsEntity.isPresent()) {
            hostsStatisticsEntity = optionalHitsHostsStatisticsEntity.get();
            hostsStatisticsEntity.setCount(hostsStatisticsEntity.getCount() + 1);
        } else {
            hostsStatisticsEntity = new HitsHostsStatisticsEntity();
            hostsStatisticsEntity.setId(new HitsHostsStatisticsId(hostsEntity.getHostId(), date));
            hostsStatisticsEntity.setCount(1);
            hostsStatisticsEntity.setCreatedAt(timestamp);
        }
        hostsStatisticsEntity.setUpdatedAt(timestamp);
        hitsHostsStatisticsRepository.save(hostsStatisticsEntity);

        long todayCount = urnsStatisticsEntity.getCount();
        long totalCount = hitsUrnsStatisticsRepository.findById_UrnId(urnsEntity.getUrnId()).stream().mapToLong(HitsUrnsStatisticsEntity::getCount).sum();
        if (extraCount != null) {
            totalCount += extraCount;
        } else {
            Optional<HitsMigrationEntity> optionalHitsMigrationEntity = hitsMigrationRepository.findById(urn);
            if (optionalHitsMigrationEntity.isPresent()) {
                totalCount += optionalHitsMigrationEntity.get().getExtraCount();
            }
        }

        String message;
        if ("today-total".equalsIgnoreCase(view)) {
            message = String.format("%s / %s", NumberFormat.getInstance().format(todayCount), NumberFormat.getInstance().format(totalCount));
        } else {
            message = NumberFormat.getInstance().format(totalCount);
        }

        return Badge.builder().style(Style.nameOf(style)).label(label).message(message).color(color).labelColor(labelColor).links(links).logo(logo).logoWidth(logoWidth).build();
    }

}
