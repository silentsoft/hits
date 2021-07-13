package org.silentsoft.hits.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.sql.Timestamp;

@Getter
@Setter
@Entity(name = "hits_hosts_statistics")
public class HitsHostsStatisticsEntity {

    @EmbeddedId
    private HitsHostsStatisticsId id;

    private long count;

    private Timestamp createdAt;

    private Timestamp updatedAt;

}
