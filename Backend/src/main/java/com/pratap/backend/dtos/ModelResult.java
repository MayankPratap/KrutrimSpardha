package com.pratap.backend.dtos;

public class ModelResult {

    private String model;
    private String response;
    private int responseTime;

    public ModelResult(String model, String response, int responseTime) {
        this.model = model;
        this.response = response;
        this.responseTime = responseTime;
    }

    public String getModel() {
        return model;
    }

    public String getResponse() {
        return response;
    }

    public int getResponseTime() {
        return responseTime;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public void setResponseTime(int responseTime) {
        this.responseTime = responseTime;
    }

}
