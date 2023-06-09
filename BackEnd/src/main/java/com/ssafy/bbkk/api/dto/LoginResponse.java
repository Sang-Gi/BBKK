package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.User;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class LoginResponse {

    private int userId;
    private String nickname;
    private String profileImageType;
    private String email;

    public LoginResponse(User user) {
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.profileImageType = user.getProfileImageType();
        this.email = user.getEmail();
    }

}