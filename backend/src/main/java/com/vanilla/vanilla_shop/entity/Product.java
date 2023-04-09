package com.vanilla.vanilla_shop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Product {
    @Id
    @Column(name = "product_id")
    private Long id;

    @Column(nullable = false)
    private String sex;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<Deal> deals = new ArrayList<>();

    @Builder
    public Product(String sex, String category, String title, int price) {
        this.sex = sex;
        this.category = category;
        this.title = title;
        this.price = price;
    }
}
