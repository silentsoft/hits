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
public class HitsUrnsStatisticsId implements Serializable {

    @Column
    private long urnId;

    @Column
    private Date date;

    public HitsUrnsStatisticsId(long urnId, Date date) {
        this.urnId = urnId;
        this.date = date;
    }

}
