package org.silentsoft.hits.repository;

import org.silentsoft.hits.entity.HitsUrnsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HitsUrnsRepository extends JpaRepository<HitsUrnsEntity, Long> {

    HitsUrnsEntity findByUrn(String urn);

}
