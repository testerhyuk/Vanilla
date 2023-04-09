package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.entity.Wish;
import com.vanilla.vanilla_shop.repository.ProductRepository;
import com.vanilla.vanilla_shop.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishService {
    private final WishRepository wishRepository;
    private final ProductRepository productRepository;

    public List<Object[]> getWishProduct(Long memberId) {
        return wishRepository.findProductByMember(memberId);
    }

    public boolean checkWishProduct(Member member, Long product) {
        Product wishedProduct = productRepository.findProductById(product);
        Long check = wishRepository.countByMemberAndProduct(member, wishedProduct);
        if (check==0) return false;
        else return true;
    }

    public void createWishProduct(Member member, Long product) {
        Wish wish = new Wish();
        Product wishedProduct = productRepository.findProductById(product);
        wish.setProduct(wishedProduct);
        wish.setMember(member);
        if (wishRepository.countByMemberAndProduct(member, wishedProduct)==0 && wishedProduct != null) {
            wishRepository.save(wish);
        }
        else return;
    }

    public void deleteWishProduct(Member member, Long product) {
        Product wishedProduct = productRepository.findProductById(product);
        Wish wish = wishRepository.findByMemberAndProduct(member, wishedProduct).orElse(null);
        wishRepository.delete(wish);
    }
}
