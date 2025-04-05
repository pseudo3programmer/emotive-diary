
package com.emotivo.journal.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "journal_entries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String text;
    
    @Column(nullable = false)
    private LocalDateTime date;
    
    @OneToOne(mappedBy = "journalEntry", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private EmotionAnalysis analysis;
}
