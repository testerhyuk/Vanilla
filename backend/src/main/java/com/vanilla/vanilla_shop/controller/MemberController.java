package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.dto.*;
import com.vanilla.vanilla_shop.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/my-page")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        System.out.println(myInfoBySecurity.getEmail());
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @PatchMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword()));
    }

    @PatchMapping("/address")
    public ResponseEntity<MemberResponseDto> setMemberAddress(@RequestBody ChangeAddressRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberAddress(request.getAddress(), request.getDetailAddress()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMember(@RequestBody DeleteMemberRequestDto requestDto) {
        memberService.deleteMemeber(requestDto);
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().body("회원 탈퇴가 완료되었습니다");
    }
}
