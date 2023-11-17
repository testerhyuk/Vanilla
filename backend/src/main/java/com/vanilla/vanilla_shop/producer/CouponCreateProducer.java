package com.vanilla.vanilla_shop.producer;

import com.vanilla.vanilla_shop.entity.Coupon;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;

@Component
@RequiredArgsConstructor
public class CouponCreateProducer {
    private final KafkaTemplate<String, Long> kafkaTemplate;

    public void create(Long userId) {
        kafkaTemplate.send("coupon_create", userId);
    }
}
