package org.silentsoft.hits.repository;

import org.silentsoft.hits.entity.HitsHostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HitsHostsRepository extends JpaRepository<HitsHostsEntity, Long> {

    HitsHostsEntity findByHost(String host);

}
