package com.vanilla.vanilla_shop.dto;

import com.vanilla.vanilla_shop.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String name;
    private String address;
    private String detailAddress;
    private String error;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .address(member.getAddress())
                .detailAddress(member.getDetailAddress())
                .build();
    }
}
