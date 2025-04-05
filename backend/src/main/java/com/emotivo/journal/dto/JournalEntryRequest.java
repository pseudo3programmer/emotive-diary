
package com.emotivo.journal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class JournalEntryRequest {
    
    @NotBlank(message = "Entry text cannot be empty")
    private String text;
    
    private AnalysisDto analysis;
    
    @Data
    public static class AnalysisDto {
        private String primaryEmotion;
        private String summary;
        private List<EmotionScoreDto> scores;
    }
    
    @Data
    public static class EmotionScoreDto {
        private String emotion;
        private Double score;
    }
}
