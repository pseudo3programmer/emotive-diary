
package com.emotivo.journal.controller;

import com.emotivo.journal.dto.JournalEntryRequest;
import com.emotivo.journal.model.JournalEntry;
import com.emotivo.journal.service.JournalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journal")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JournalController {
    
    private final JournalService journalService;
    
    @GetMapping
    public ResponseEntity<List<JournalEntry>> getAllEntries() {
        return ResponseEntity.ok(journalService.getAllEntries());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JournalEntry> getEntryById(@PathVariable Long id) {
        return ResponseEntity.ok(journalService.getEntryById(id));
    }
    
    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(@Valid @RequestBody JournalEntryRequest request) {
        return new ResponseEntity<>(journalService.saveEntry(request), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        journalService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<JournalEntry>> searchEntries(@RequestParam String query) {
        return ResponseEntity.ok(journalService.searchEntries(query));
    }
    
    @GetMapping("/emotion/{emotion}")
    public ResponseEntity<List<JournalEntry>> getEntriesByEmotion(@PathVariable String emotion) {
        return ResponseEntity.ok(journalService.getEntriesByEmotion(emotion));
    }
}
