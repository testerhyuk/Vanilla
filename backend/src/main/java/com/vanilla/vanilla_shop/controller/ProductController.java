package com.vanilla.vanilla_shop.controller;

import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/api/product-best")
    public List<Product> productTopTen() {
        return productService.findProductTopTen();
    }

    @GetMapping("/api/product/search")
    public List<Product> findProductByKeyword(@RequestParam("keyword") String keyword) {
        return productService.findByKeyword(keyword);
    }

    @GetMapping("/api/category/{sex}/{cat}")
    public List<Product> findCategoryProduct(@PathVariable String sex, @PathVariable String cat) {
        return productService.findProductByCategory(sex, cat);
    }
}
