package org.silentsoft.hits.repository;

import org.silentsoft.hits.entity.HitsUrnsStatisticsEntity;
import org.silentsoft.hits.entity.HitsUrnsStatisticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitsUrnsStatisticsRepository extends JpaRepository<HitsUrnsStatisticsEntity, HitsUrnsStatisticsId> {

    List<HitsUrnsStatisticsEntity> findById_UrnId(long id);

    List<HitsUrnsStatisticsEntity> findById_UrnIdOrderById_DateDesc(long id);

    @Query("SELECT SUM(h.count) FROM hits_urns_statistics h")
    Long getTotalHits();

}
