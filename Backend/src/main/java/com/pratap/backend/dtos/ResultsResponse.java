package com.pratap.backend.dtos;

import java.util.List;

public class ResultsResponse {

    private List<com.pratap.backend.dtos.ModelResult> results;

    public List<com.pratap.backend.dtos.ModelResult> getResults() {
        return results;
    }
    public void setResults(List<ModelResult> results) {
        this.results = results;
    }

}

