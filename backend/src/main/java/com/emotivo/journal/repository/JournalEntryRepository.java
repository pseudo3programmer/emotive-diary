
package com.emotivo.journal.repository;

import com.emotivo.journal.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    
    List<JournalEntry> findAllByOrderByDateDesc();
    
    @Query("SELECT j FROM JournalEntry j WHERE LOWER(j.text) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<JournalEntry> searchByText(String query);
    
    @Query("SELECT j FROM JournalEntry j WHERE j.analysis.primaryEmotion = :emotion")
    List<JournalEntry> findByPrimaryEmotion(String emotion);
}
