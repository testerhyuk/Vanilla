package com.vanilla.vanilla_shop.repository;

import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    @Query(value = "select p.product_id, p.price, p.title from Wish w" +
            " join Product p on p.product_id = w.product_id join Member m on w.member_id = m.member_id" +
            " where w.member_id = :memberId", nativeQuery = true)
    List<Object[]> findProductByMember(@Param("memberId") Long memberId);

    Optional<Wish> findByMemberAndProduct(Member member, Product product);

    Long countByMemberAndProduct(Member member, Product product);
}
