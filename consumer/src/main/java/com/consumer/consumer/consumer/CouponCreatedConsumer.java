package com.consumer.consumer.consumer;

import com.consumer.consumer.entity.Coupon;
import com.consumer.consumer.entity.FailedEvent;
import com.consumer.consumer.repository.CouponRepository;
import com.consumer.consumer.repository.FailedEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CouponCreatedConsumer {
    private final CouponRepository couponRepository;
    private final FailedEventRepository failedEventRepository;

    @KafkaListener(topics = "coupon_create", groupId = "group_1")
    public void listener(Long memberId) {
        try {
            couponRepository.save(new Coupon(memberId));
        } catch (Exception e) {
            log.info("Failed to create coupon::" + memberId);
            failedEventRepository.save(new FailedEvent(memberId));
        }
    }
}
