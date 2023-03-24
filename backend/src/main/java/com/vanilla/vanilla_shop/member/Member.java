package com.vanilla.vanilla_shop.member;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Member {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(nullable = false)
    private String email;

    private String password;
    private String address;
    private String role;
    private String authProvider;
}
