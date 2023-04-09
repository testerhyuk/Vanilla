package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.awt.print.Pageable;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> findProductTopTen() {
        return productRepository.findTop10ByIdOrderByDesc();
    }

    public List<Product> findByKeyword(String keyword) {
        return productRepository.findByTitleContaining(keyword);
    }

    public List<Product> findByCatAndSex(String cat, String sex) {
        return productRepository.findByCategoryAndSex(cat, sex);
    }
}
