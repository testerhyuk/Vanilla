package com.vanilla.vanilla_shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor
public class Product {
    @Id
    private Long id;

    @Column(nullable = false)
    private String sex;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int price;

    @Builder
    public Product(String sex, String category, String title, int price) {
        this.sex = sex;
        this.category = category;
        this.title = title;
        this.price = price;
    }
}
