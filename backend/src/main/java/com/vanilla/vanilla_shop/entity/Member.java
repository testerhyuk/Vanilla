package com.vanilla.vanilla_shop.entity;

import com.vanilla.vanilla_shop.role.Authority;
import lombok.*;
import javax.persistence.*;



@Entity
@Getter
@Builder
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
