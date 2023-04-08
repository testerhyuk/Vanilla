package com.vanilla.vanilla_shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeAddressRequestDto {
    private String address;
    private String detailAddress;
}
