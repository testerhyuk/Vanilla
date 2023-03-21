package com.vanilla.vanilla_shop.entity;

import com.vanilla.vanilla_shop.repository.ProductRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ProductTest {
    @Autowired
    ProductRepository productRepository;

    @Test
    public void ProductTest() {
        System.out.println("==============================");
        Product product = productRepository.findTopTen().get(0);
        System.out.println(product.getCategory());
        System.out.println(product.getTitle());
        System.out.println("==============================");
    }
}