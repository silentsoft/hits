package org.silentsoft.hits.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.sql.Timestamp;

@Getter
@Setter
@Entity(name = "hits_urns_statistics")
public class HitsUrnsStatisticsEntity {

    @EmbeddedId
    private HitsUrnsStatisticsId id;

    private long count;

    private Timestamp createdAt;

    private Timestamp updatedAt;

}
