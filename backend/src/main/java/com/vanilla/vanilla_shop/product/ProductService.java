package com.vanilla.vanilla_shop.product;

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

    public List<Product> findByKeyword(String keyword) {
        return productRepository.findProdByKeyword(keyword);
    }

    public List<Product> findProductByCategory(String sex, String cat) {
        return productRepository.findProductByCat(sex, cat);
    }
}
