package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.*;
import com.ssafy.bbkk.api.service.ThemeService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("theme")
@RequiredArgsConstructor
public class ThemeController {

    private static final Logger logger = LoggerFactory.getLogger(ThemeController.class);

    private final ThemeService themeService;

    @Operation(summary = "로그인 테마 목록 조회", description = "로그인시 메인 화면의 테마를 불러온다")
    @GetMapping("user")
    private ResponseEntity<Map<String, Object>> recommendedTheme(
            @AuthenticationPrincipal User user) throws Exception {
        logger.info("[recommendedTheme] request : myEmail={}",user.getUsername());

        Map<String, Object> resultMap = new HashMap<>();

        List<ThemeBundleResponse> recommendThemes = themeService.getRecommendedThemes(user.getUsername());
        List<PreviewThemeResponse> hotThemes = themeService.getHotThemes();
        List<ThemeBundleResponse> topThemes = themeService.getTopThemesOfUser(user.getUsername());
        AwardThemeBundleResponse awardThemes = themeService.getAwardThemes();

        resultMap.put("recommendThemes", recommendThemes);
        resultMap.put("hotThemes", hotThemes);
        resultMap.put("topThemes", topThemes);
        resultMap.put("awardThemes", awardThemes);

        logger.info("[recommendedTheme] response : recommendThemes={}", recommendThemes);
        logger.info("[recommendedTheme] response : hotThemes={}", hotThemes);
        logger.info("[recommendedTheme] response : topThemes={}", topThemes);
        logger.info("[recommendedTheme] response : awardThemes={}", topThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "게스트 테마 목록 조회", description = "메인 화면의 기본 테마 목록을 불러온다")
    @GetMapping("guest")
    private ResponseEntity<Map<String, Object>> topTheme() throws Exception {
        logger.info("[topTheme] request : ");

        Map<String, Object> resultMap = new HashMap<>();

        List<PreviewThemeResponse> hotThemes = themeService.getHotThemes();
        List<ThemeBundleResponse> topThemes = themeService.getTopThemes();
        AwardThemeBundleResponse awardThemes = themeService.getAwardThemes();

        resultMap.put("hotThemes", hotThemes);
        resultMap.put("topThemes", topThemes);
        resultMap.put("awardThemes", awardThemes);

        logger.info("[topTheme] response : hotThemes={}", hotThemes);
        logger.info("[topTheme] response : topThemes={}",topThemes);
        logger.info("[topTheme] response : awardThemes={}", awardThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마 검색", description = "필터를 기반으로 일치하는 테마를 불러온다")
    @GetMapping("search")
    private ResponseEntity<Map<String, Object>> searchedTheme(
            @ModelAttribute SearchThemeRequest searchThemeRequest) throws Exception {
        logger.info("[searchedTheme] request : SearchThemeRequest={}", searchThemeRequest);

        Map<String, Object> resultMap = new HashMap<>();
        List<PreviewThemeResponse> previewThemeResponses = themeService.getSearchThemes(searchThemeRequest);

        resultMap.put("themes", previewThemeResponses);

        logger.info("[searchedTheme] response : themes={}", previewThemeResponses);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 상세 정보 조회", description = "해당 테마의 상세 정보를 불러온다")
    @GetMapping("{themeId}")
    private ResponseEntity<Map<String, Object>> themeInfo(
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable("themeId") int themeId) throws Exception {
        logger.info("[themeInfo] request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();
        ThemeResponse themeResponse = themeService.getThemeInfo(themeId);

        resultMap.put("theme", themeResponse);

        logger.info("[themeInfo] response : theme={}", themeResponse);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰 목록 조회", description = "해당 테마의 리뷰 목록을 불러온다")
    @GetMapping("{themeId}/reviews")
    private ResponseEntity<Map<String, Object>> getReviews(
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int themeId) throws Exception {
        logger.info("[getReviews] request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();
        List<ReviewOfThemeResponse> reviewOfThemeResponses = themeService.getReviews(themeId);

        resultMap.put("reviews", reviewOfThemeResponses);

        logger.info("[getReviews] response : reviews={}", reviewOfThemeResponses);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}