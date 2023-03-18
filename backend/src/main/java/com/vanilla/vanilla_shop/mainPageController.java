package com.vanilla.vanilla_shop;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class mainPageController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}
