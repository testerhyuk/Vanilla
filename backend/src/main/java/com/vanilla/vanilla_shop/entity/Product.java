package com.vanilla.vanilla_shop.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor
public class Product {
    @Id
    private Long id;

    private String sex;
    private String category;
    private String title;
    private int price;

    public Product(String sex, String category, String title, int price) {
        this.sex = sex;
        this.category = category;
        this.title = title;
        this.price = price;
    }
}
