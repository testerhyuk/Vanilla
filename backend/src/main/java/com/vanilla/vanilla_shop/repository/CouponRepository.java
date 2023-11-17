package com.vanilla.vanilla_shop.repository;

import com.vanilla.vanilla_shop.entity.Coupon;
import com.vanilla.vanilla_shop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
}
