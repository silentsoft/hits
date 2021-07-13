package org.silentsoft.hits.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Date;

@Data
@NoArgsConstructor
@Embeddable
public class HitsHostsStatisticsId implements Serializable {

    @Column
    private long hostId;

    @Column
    private Date date;

    public HitsHostsStatisticsId(long hostId, Date date) {
        this.hostId = hostId;
        this.date = date;
    }

}
