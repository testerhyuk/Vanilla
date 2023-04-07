package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.dto.MemberRequestDto;
import com.vanilla.vanilla_shop.dto.MemberResponseDto;
import com.vanilla.vanilla_shop.dto.TokenDto;
import com.vanilla.vanilla_shop.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
        try {
            return ResponseEntity.ok(authService.signup(requestDto));
        } catch (Exception e) {
            MemberResponseDto errorDto = MemberResponseDto.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(errorDto);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        try {
            return ResponseEntity.ok(authService.login(requestDto));
        } catch (Exception e) {
            TokenDto errorDto = TokenDto.builder().error("아이디 또는 비밀번호를 확인하세요").build();
            return ResponseEntity.badRequest().body(errorDto);
        }
    }
}
