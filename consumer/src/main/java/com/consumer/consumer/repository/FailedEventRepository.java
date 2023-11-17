package com.consumer.consumer.repository;

import com.consumer.consumer.entity.FailedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailedEventRepository extends JpaRepository<FailedEvent, Long> {
}
