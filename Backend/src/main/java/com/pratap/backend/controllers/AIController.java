package com.pratap.backend.controllers;

import com.pratap.backend.dtos.ModelResult;
import com.pratap.backend.dtos.PromptRequest;
import com.pratap.backend.dtos.ResultsResponse;
import com.pratap.backend.services.AnthropicService;
import com.pratap.backend.services.OllamaService;
import com.pratap.backend.services.OpenAIService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AIController {

    private final OpenAIService openAIService;
    private final AnthropicService anthropicService;
    private final OllamaService ollamaService;

    public AIController(OpenAIService openAIService, AnthropicService anthropicService, OllamaService ollamaService) {

        this.openAIService = openAIService;
        this.anthropicService = anthropicService;
        this.ollamaService = ollamaService;
    }

    @PostMapping("/compare")
    public ResultsResponse getAndCompareResults(@RequestBody PromptRequest request) {

        // Extract the prompt from the request body.
        String prompt  = request.getPrompt();

        ModelResult openAIResponse = openAIService.getResponse(prompt);

        ModelResult anthropicResponse = anthropicService.getResponse(prompt);

        ModelResult ollamaResponse = ollamaService.getResponse(prompt);

        List<ModelResult> results = new ArrayList<>();

        results.add(openAIResponse);
        results.add(anthropicResponse);
        results.add(ollamaResponse);

        ResultsResponse response = new ResultsResponse();
        response.setResults(results);

        return response;

    }



}
