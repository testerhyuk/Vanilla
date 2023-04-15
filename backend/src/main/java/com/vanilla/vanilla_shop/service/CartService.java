package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.entity.Cart;
import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.repository.CartRepository;
import com.vanilla.vanilla_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public List<Object[]> getCartProduct(Long memberId) {
        return cartRepository.findProductByMember(memberId);
    }

    public boolean checkCartProduct(Member member, Long product) {
        Product cartProduct = productRepository.findProductById(product);
        Long check = cartRepository.countByMemberAndProduct(member, cartProduct);
        if (check==0) return false;
        else return true;
    }

    public void createCartProduct(Member member, Map<String, String> product) {
        Cart cart = new Cart();
        Product cartProduct = productRepository.findProductById(Long.valueOf(product.get("product")));
        cart.setProduct(cartProduct);
        cart.setQuantity(Integer.parseInt(product.get("quantity")));
        cart.setMember(member);
        if (cartRepository.countByMemberAndProduct(member, cartProduct)==0 && cartProduct != null) {
            cartRepository.save(cart);
        }
        else return;
    }

    public void deleteCartProduct(Member member, Map<String, String> product) {
        Product cartProduct = productRepository.findProductById(Long.valueOf(product.get("product")));
        Cart cart = cartRepository.findByMemberAndProduct(member, cartProduct).orElse(null);
        cartRepository.delete(cart);
    }

    public void plusPriceAndQuantity(Member member, Map<String, String> product) {
        Product cartProduct = productRepository.findProductById(Long.valueOf(product.get("product")));
        Cart cart = cartRepository.findByMemberAndProduct(member, cartProduct).orElse(null);
//        cartRepository.delete(cart);

        cart.setQuantity(Integer.parseInt(product.get("quantity")) + 1);
        cart.setMember(member);
        cart.setProduct(cartProduct);

        cartRepository.save(cart);
    }

    public void minusPriceAndQuantity(Member member, Map<String, String> product) {
        Product cartProduct = productRepository.findProductById(Long.valueOf(product.get("product")));
        Cart cart = cartRepository.findByMemberAndProduct(member, cartProduct).orElse(null);
//        cartRepository.delete(cart);

        if (Integer.parseInt(product.get("quantity")) != 1) {
            cart.setQuantity(Integer.parseInt(product.get("quantity")) - 1);
            cart.setMember(member);
            cart.setProduct(cartProduct);

            cartRepository.save(cart);
        }
    }
}
