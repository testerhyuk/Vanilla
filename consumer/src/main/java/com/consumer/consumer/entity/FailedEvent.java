package com.consumer.consumer.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class FailedEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "member_id")
    private Long memberId;

    public FailedEvent(Long memberId){
        this.memberId = memberId;
    }
}
