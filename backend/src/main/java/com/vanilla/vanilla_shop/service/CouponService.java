package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.producer.CouponCreateProducer;
import com.vanilla.vanilla_shop.repository.AppliedUserRepository;
import com.vanilla.vanilla_shop.repository.CouponCountRepository;
import com.vanilla.vanilla_shop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CouponService {
    private final CouponCountRepository couponCountRepository;
    private final CouponCreateProducer couponCreateProducer;
    private final AppliedUserRepository appliedUserRepository;
    private final MemberRepository memberRepository;

    public String apply(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다"));

        Long apply = appliedUserRepository.add(memberId);

        if (apply != 1) {
            log.info("이미 쿠폰을 받은 회원입니다");
            return "이미 쿠폰을 받았습니다";
        }

        Long count = couponCountRepository.increment();

        if (count > 100) {
            log.info("이벤트 쿠폰이 모두 소진되었습니다");
            return "이벤트 쿠폰이 모두 소진되었습니다";
        }

        couponCreateProducer.create(memberId);

        return "쿠폰 발급 성공!";
    }
}
