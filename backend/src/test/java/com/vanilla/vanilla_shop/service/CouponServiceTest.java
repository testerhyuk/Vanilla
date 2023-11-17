package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.repository.CouponRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CouponServiceTest {
    @Autowired
    private CouponService couponService;

    @Autowired
    private CouponRepository couponRepository;

    @Test
    public void 한번만_응모() {
        couponService.apply(1L);

        Long count = couponRepository.count();

        assertEquals(1, count);
    }

    @Test
    public void 여러명_응모() throws InterruptedException {
        int threadCount = 1000;

        ExecutorService executorService = Executors.newFixedThreadPool(32);

        CountDownLatch latch = new CountDownLatch(threadCount);

        for(int i =0; i < threadCount; i++) {
            long userId = i;
            executorService.submit(() -> {
                try {
                    couponService.apply(userId);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        Thread.sleep(20000);

        long count = couponRepository.count();

        assertEquals(100, count);
    }

    @Test
    public void 한명당_한개의_쿠폰만_발급() throws InterruptedException {
        int threadCount = 1000;

        ExecutorService executorService = Executors.newFixedThreadPool(32);

        CountDownLatch latch = new CountDownLatch(threadCount);

        for(int i =0; i < threadCount; i++) {
            long userId = i;
            executorService.submit(() -> {
                try {
                    couponService.apply(1L);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        Thread.sleep(15000);

        long count = couponRepository.count();

        assertEquals(1, count);
    }
}