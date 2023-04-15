package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.config.SecurityUtil;
import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.repository.MemberRepository;
import com.vanilla.vanilla_shop.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartService cartService;
    private final MemberRepository memberRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createCartProduct(@RequestBody Map<String, String> product) {
        try {
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
            cartService.createCartProduct(member, product);
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("문제가 발생했습니다");
    }

    @GetMapping("/read")
    public ResponseEntity<List<Object[]>> readCartProduct() {
        Member memberId = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        Long mem = memberId.getId();
        List<Object[]> carts = cartService.getCartProduct(mem);

        return ResponseEntity.ok().body(carts);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCartProduct(@RequestBody Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        cartService.deleteCartProduct(member, product);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/check/{product}")
    public ResponseEntity<?> checkCartProduct(@PathVariable Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        Boolean flag = false;
        flag = cartService.checkCartProduct(member, Long.valueOf(product.get("product")));
        return ResponseEntity.ok().body(flag);
    }

    @PatchMapping("/plus")
    public ResponseEntity<?> plusCartProductInfo(@RequestBody Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        cartService.plusPriceAndQuantity(member, product);
        return ResponseEntity.ok().body("success");
    }

    @PatchMapping("/minus")
    public ResponseEntity<?> minusCartProductInfo(@RequestBody Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        cartService.minusPriceAndQuantity(member, product);
        return ResponseEntity.ok().body("success");
    }
}
