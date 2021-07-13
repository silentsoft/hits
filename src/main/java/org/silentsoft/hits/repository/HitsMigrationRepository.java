package org.silentsoft.hits.repository;

import org.silentsoft.hits.entity.HitsMigrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HitsMigrationRepository extends JpaRepository<HitsMigrationEntity, String> {

}
