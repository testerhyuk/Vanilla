package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping("/api/v1/product-best")
    public List<Product> productTopTen() {
        return productService.findProductTopTen();
    }

    @GetMapping("/api/v1/product/search")
    public List<Product> findByTitleContaining(@RequestParam("keyword") String keyword) {
        return productService.findByKeyword(keyword);
    }

    @GetMapping("/api/v1/category/{sex}/{cat}")
    public List<Product> findCategoryProduct(@PathVariable("cat") String cat, @PathVariable("sex") String sex) {
        return productService.findByCatAndSex(cat, sex);
    }
}
