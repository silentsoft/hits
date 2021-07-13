package org.silentsoft.hits.repository;

import org.silentsoft.hits.entity.HitsHostsStatisticsEntity;
import org.silentsoft.hits.entity.HitsHostsStatisticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitsHostsStatisticsRepository extends JpaRepository<HitsHostsStatisticsEntity, HitsHostsStatisticsId> {

    List<HitsHostsStatisticsEntity> findById_HostId(long id);

}
