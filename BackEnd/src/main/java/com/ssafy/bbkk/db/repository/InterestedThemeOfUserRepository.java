package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.InterestedThemeOfUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestedThemeOfUserRepository extends JpaRepository<InterestedThemeOfUser, Integer> {
    boolean existsByUserIdAndThemeId(int userId, int themeId);
    void deleteByUserIdAndThemeId(int userId, int themeId);
}