package com.vanilla.vanilla_shop.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AppliedUserRepository {
    private final RedisTemplate<String, String> redisTemplate;

    public Long add(Long memberId) {
        return redisTemplate.opsForSet().add("applied_user", memberId.toString());
    }
}
