package com.vanilla.vanilla_shop.service;

import com.vanilla.vanilla_shop.entity.Product;
import com.vanilla.vanilla_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> findProductTopTen() {
        return productRepository.findTopTen();
    }

    public Product findById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> findProductByCategory(String sex, String cat) {
        return productRepository.findProductByCat(sex, cat);
    }
}
