package com.vanilla.vanilla_shop.repository;

import com.vanilla.vanilla_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductById(Long id);

    @Query(value = "select * from Product limit 10", nativeQuery = true)
    List<Product> findTop10ByIdOrderByDesc();

    List<Product> findByTitleContaining(String keyword);

    List<Product> findByCategoryAndSex(String cat, String sex);


}
