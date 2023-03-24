package com.vanilla.vanilla_shop.error;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {
    @GetMapping({"/", "/error"})
    public String index() { return "index.html";}

    public String getErrorPath() {
        return "/error";
    }
}
