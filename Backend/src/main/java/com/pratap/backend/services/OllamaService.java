package com.pratap.backend.services;

import com.pratap.backend.dtos.ModelResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class OllamaService {

    @Value("${spring.ai.ollama.chat.options.model}")
    private String model;

    private final String url = "http://localhost:11434/api/generate";

    public ModelResult getResponse(String prompt) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = """
                    {
                        "model": "%s",
                        "prompt": "%s",
                        "stream": false
                    }
                """.formatted(model, prompt);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        long startTime = System.currentTimeMillis();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        long responseTime = System.currentTimeMillis() - startTime;

        String responseText = (String) response.getBody().get("response");

        return new ModelResult("Ollama (llama3.2)", responseText, (int) responseTime);
    }
}
