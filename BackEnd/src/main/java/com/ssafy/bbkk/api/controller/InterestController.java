package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.api.service.InterestThemeService;
import com.ssafy.bbkk.api.service.OtherService;
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
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("interest")
@RequiredArgsConstructor
public class InterestController {

    private static final Logger logger = LoggerFactory.getLogger(InterestController.class);

    private final InterestThemeService interestThemeService;
    private final OtherService otherService;

    @Operation(summary = "관심 테마 등록", description = "내 관심 테마로 등록한다")
    @PostMapping("{themeId}")
    private ResponseEntity<Void> addInterestTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "관심 버튼을 누른 테마의 Id", required = true) @PathVariable int themeId) throws Exception{
        LocalDateTime now = LocalDateTime.now();
        logger.info("\n[{}]<<---------------(start)----------------||addInterestTheme||------------------------------------>>",now);
        logger.info(">> request : myEmail={}", user.getUsername());
        logger.info(">> request : themeId={}", themeId);

        interestThemeService.addInterestTheme(user.getUsername(), themeId);
        logger.info("<< response : none");

        otherService.recCBF(user.getUsername());
        logger.info("<< response api : recCBF({})", user.getUsername());
        logger.info("\n[{}]<<---------------------------------------||addInterestTheme||---------------(end)--------------->>",now);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "관심 테마 제거", description = "내 관심 테마에서 제거한다")
    @DeleteMapping("{themeId}")
    private ResponseEntity<Void> deleteInterestTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "관심 버튼을 누른 테마의 Id", required = true) @PathVariable int themeId) throws Exception{
        LocalDateTime now = LocalDateTime.now();
        logger.info("\n[{}]<<---------------(start)----------------||deleteInterestTheme||------------------------------------>>",now);
        logger.info(">> request : myEmail={}", user.getUsername());
        logger.info(">> request : themeId={}", themeId);

        interestThemeService.deleteInterestTheme(user.getUsername(), themeId);
        logger.info("<< response : none");

        otherService.recCBF(user.getUsername());
        logger.info("<< response api : recCBF({})",user.getUsername());
        logger.info("\n[{}]<<---------------------------------------||deleteInterestTheme||---------------(end)--------------->>",now);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}