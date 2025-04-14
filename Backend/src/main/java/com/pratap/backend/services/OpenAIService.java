package com.pratap.backend.services;

import com.pratap.backend.dtos.ModelResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;

@Service
public class OpenAIService {
    
    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    public ModelResult getResponse(String prompt) {

        OpenAIClient client = OpenAIOkHttpClient.builder()
                .apiKey(apiKey)
                .build();

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input(prompt)
                .model(ChatModel.GPT_4O)
                .build();

        long startTime = System.currentTimeMillis();
        String responseText;
        int responseTime;
        try {
            Response response = client.responses().create(params);
            responseText = response.output().get(0).message().get().content().get(0).outputText().get().text();
            responseTime = (int) (System.currentTimeMillis() - startTime);
        } catch (Exception e) {
            responseText = "Error fetching response from OpenAI: " + e.getMessage();
            responseTime = 0;
        }

        return new ModelResult("OpenAI (GPT-4o)", responseText, responseTime);
    }


}
