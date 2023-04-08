package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/emailcode")
    public void emailConfirm(@RequestBody Map<String, String> email) throws Exception {
        mailService.sendSimpleMessage(email.get("email"));
    }

    @PostMapping("/verifycode")
    public ResponseEntity<String> checkVerifyCode(@RequestBody Map<String, String> code) throws Exception {
        if (MailService.epw.equals(code.get("epw"))) {
            return ResponseEntity.ok(MailService.epw);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
