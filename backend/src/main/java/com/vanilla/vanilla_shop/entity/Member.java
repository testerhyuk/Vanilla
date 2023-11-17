package com.vanilla.vanilla_shop.entity;

import com.vanilla.vanilla_shop.state.Authority;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    private String address;
    private String detailAddress;

   @Enumerated(EnumType.STRING)
   private Authority authority;

   @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
   List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<Cart> carts = new ArrayList<>();

   @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL)
   List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    List<Deal> deals = new ArrayList<>();

    public void setPassword(String password) {

       this.password = password;
   }

   public void setAddress(String address, String detailAddress) {
       this.address = address;
       this.detailAddress = detailAddress;
   }

   @Builder
    public Member(Long id, String name, String email, String password, String address, String detailAddress, Authority authority) {
       this.id = id;
       this.name = name;
       this.email = email;
       this.password = password;
       this.address = address;
       this.detailAddress = detailAddress;
       this.authority = authority;
   }
}
