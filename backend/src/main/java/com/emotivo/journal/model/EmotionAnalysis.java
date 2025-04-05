
package com.emotivo.journal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "emotion_analyses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmotionAnalysis {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String primaryEmotion;
    
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    @OneToOne
    @JoinColumn(name = "journal_entry_id")
    @JsonBackReference
    private JournalEntry journalEntry;
    
    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EmotionScore> scores = new ArrayList<>();
}
