package com.vanilla.vanilla_shop.repository;

import com.vanilla.vanilla_shop.entity.Cart;
import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query(value = "select c.product_id, price * quantity as price, title, c.quantity from Cart c" +
            " join Product p on p.product_id = c.product_id join Member m on c.member_id = m.member_id" +
            " where c.member_id = :memberId order by c.cart_id", nativeQuery = true)
    List<Object[]> findProductByMember(@Param("memberId") Long memberId);

    Optional<Cart> findByMemberAndProduct(Member member, Product product);

    Long countByMemberAndProduct(Member member, Product product);
}
