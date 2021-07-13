package org.silentsoft.hits.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Setter
@Entity(name = "hits_migration")
public class HitsMigrationEntity {

    @Id
    private String urn;

    private long extraCount;

    private Timestamp createdAt;

    private Timestamp updatedAt;

}
