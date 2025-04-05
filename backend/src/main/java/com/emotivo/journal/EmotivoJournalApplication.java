
package com.emotivo.journal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class EmotivoJournalApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmotivoJournalApplication.class, args);
    }
}

@RestController
class HomeController {
    @GetMapping("/")
    public String home() {
        return "Emotivo Journal API is running!";
    }
}
