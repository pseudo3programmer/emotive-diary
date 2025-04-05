
package com.emotivo.journal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "emotion_scores")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmotionScore {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String emotion;
    
    @Column(nullable = false)
    private Double score;
    
    @ManyToOne
    @JoinColumn(name = "analysis_id")
    @JsonBackReference
    private EmotionAnalysis analysis;
}
