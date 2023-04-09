package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.config.SecurityUtil;
import com.vanilla.vanilla_shop.entity.Member;
import com.vanilla.vanilla_shop.repository.MemberRepository;
import com.vanilla.vanilla_shop.service.WishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/wishes")
@RequiredArgsConstructor
public class WishController {
    private final WishService wishService;
    private final MemberRepository memberRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createWishProduct(@RequestBody Map<String, String> product) {
        try {
            Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
            wishService.createWishProduct(member, Long.valueOf(product.get("product")));
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("문제가 발생했습니다");
    }

    @GetMapping("/read")
    public ResponseEntity<List<Object[]>> readWishProduct() {
        Member memberId = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        Long mem = memberId.getId();
        List<Object[]> wishes = wishService.getWishProduct(mem);

        return ResponseEntity.ok().body(wishes);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteWishProduct(@RequestBody Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        wishService.deleteWishProduct(member, Long.valueOf(product.get("product")));
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/check/{product}")
    public ResponseEntity<?> checkWishProduct(@PathVariable Map<String, String> product) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).get();
        Boolean flag = false;
        flag = wishService.checkWishProduct(member, Long.valueOf(product.get("product")));
        return ResponseEntity.ok().body(flag);
    }
}
