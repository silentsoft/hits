package org.silentsoft.hits.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Setter
@Entity(name = "hits_urns")
public class HitsUrnsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long urnId;

    private String urn;

    private Timestamp createdAt;

    private Timestamp updatedAt;

}
