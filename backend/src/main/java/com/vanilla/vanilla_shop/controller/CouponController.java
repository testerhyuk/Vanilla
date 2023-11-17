package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.entity.Coupon;
import com.vanilla.vanilla_shop.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CouponController {
    private final CouponService couponService;

    @GetMapping("/api/event/{id}")
    public ResponseEntity<String> createCoupon(@PathVariable Long id) {
        String msg = couponService.apply(id);

        return ResponseEntity.status(HttpStatus.OK).body(msg);
    }
}
