package com.frontverse.model;

import com.fasterxml.jackson.annotation.JsonProperty;

// --- MODELO DE CADA RENOVACION ---
public class Renovation {
    @JsonProperty("No. de póliza")
    private String policyNumber;

    @JsonProperty("Nombre del riesgo")
    private String riskName;

    @JsonProperty("Fecha de contrato")
    private String contractDate;

    @JsonProperty("Fecha de vencimiento")
    private String maturityDate;

    @JsonProperty("Importe")
    private String amount;      

    @JsonProperty("Estado de póliza")
    private String policyState;  

    // - GETTERS y SETTERS: Jackson los usa para serializar cada objeto a JSON. -
    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public String getRiskName() { return riskName; }
    public void setRiskName(String riskName) { this.riskName = riskName; }

    public String getContractDate() { return contractDate; }
    public void setContractDate(String contractDate) { this.contractDate = contractDate; }

    public String getMaturityDate() { return maturityDate; }
    public void setMaturityDate(String maturityDate) { this.maturityDate = maturityDate; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getPolicyState() { return policyState; }
    public void setPolicyState(String policyState) { this.policyState = policyState; }
}
