package com.pratap.backend.services;

import com.openai.models.responses.Response;
import com.pratap.backend.dtos.ModelResult;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.messages.Message;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.Model;

@Service
public class AnthropicService {

    @Value("${spring.ai.anthropic.api-key}")
    private String apiKey;

    public ModelResult getResponse(String prompt) {

        AnthropicClient client = AnthropicOkHttpClient.builder()
                .apiKey(apiKey)
                .build();

        MessageCreateParams params = MessageCreateParams.builder()
                .model(Model.CLAUDE_3_5_SONNET_LATEST)
                .maxTokens(2048)
                .addUserMessage(prompt)
                .build();

        long startTime = System.currentTimeMillis();
        String responseText;
        int responseTime;
        try {
            Message message = client.messages().create(params);
            responseText = message.content().get(0).text().get().text();
            responseTime = (int) (System.currentTimeMillis() - startTime);
        } catch (Exception e) {
            responseText = "Error fetching response from OpenAI: " + e.getMessage();
            responseTime = 0;
        }
        return new ModelResult("Anthropic (Claude)", responseText, responseTime);

    }

}
