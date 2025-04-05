
package com.emotivo.journal.service;

import com.emotivo.journal.dto.JournalEntryRequest;
import com.emotivo.journal.model.EmotionAnalysis;
import com.emotivo.journal.model.EmotionScore;
import com.emotivo.journal.model.JournalEntry;
import com.emotivo.journal.repository.JournalEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JournalService {
    
    private final JournalEntryRepository journalEntryRepository;
    
    public List<JournalEntry> getAllEntries() {
        return journalEntryRepository.findAllByOrderByDateDesc();
    }
    
    public List<JournalEntry> searchEntries(String query) {
        return journalEntryRepository.searchByText(query);
    }
    
    public List<JournalEntry> getEntriesByEmotion(String emotion) {
        return journalEntryRepository.findByPrimaryEmotion(emotion);
    }
    
    @Transactional
    public JournalEntry saveEntry(JournalEntryRequest request) {
        // Create the journal entry
        JournalEntry entry = JournalEntry.builder()
                .text(request.getText())
                .date(LocalDateTime.now())
                .build();
        
        // Create the emotion analysis
        EmotionAnalysis analysis = EmotionAnalysis.builder()
                .primaryEmotion(request.getAnalysis().getPrimaryEmotion())
                .summary(request.getAnalysis().getSummary())
                .journalEntry(entry)
                .build();
        
        // Create emotion scores
        List<EmotionScore> scores = request.getAnalysis().getScores().stream()
                .map(scoreDto -> EmotionScore.builder()
                        .emotion(scoreDto.getEmotion())
                        .score(scoreDto.getScore())
                        .analysis(analysis)
                        .build())
                .collect(Collectors.toList());
        
        analysis.setScores(scores);
        entry.setAnalysis(analysis);
        
        return journalEntryRepository.save(entry);
    }
    
    public JournalEntry getEntryById(Long id) {
        return journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal entry not found"));
    }
    
    @Transactional
    public void deleteEntry(Long id) {
        journalEntryRepository.deleteById(id);
    }
}
