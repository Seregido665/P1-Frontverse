package com.frontverse.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.frontverse.dto.PagedResponse;
import com.frontverse.model.Renovation;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// --- LOGICA DE NEGOCIO ---
@Service
public class RenovationService {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private List<Renovation> allRenovations = new ArrayList<>();


    // -- LEE EL JSON Y LOS PASA A OBJETO JAVA --
    @PostConstruct
    public void loadRenovations() throws IOException {
        ObjectMapper mapper = new ObjectMapper();              
        ClassPathResource resource = new ClassPathResource("renovations.json");   
        allRenovations = mapper.readValue(resource.getInputStream(), new TypeReference<List<Renovation>>() {});  
    }


    // -- DEVUELVE TODAS LA POLIZAS --
    public List<Renovation> getAllRenovations() {
        return new ArrayList<>(allRenovations);
    }


    // -- FILTROS --
    public List<Renovation> filterAndSort(
            List<String> riskNames,  
            String startDate,      
            String endDate,      
            Double importValue,      
            String state,         
            String orderBy           
    ) {
        List<Renovation> result = new ArrayList<>(allRenovations);

        // - Filtro por NOMBRE DE RIESGO -
        if (riskNames != null && !riskNames.isEmpty()) {
            result = result.stream()
                    .filter(r -> riskNames.stream()
                            .anyMatch(name -> name.equalsIgnoreCase(r.getRiskName())))
                    .toList();
        }

        // - Filtro por RANGO DE FECHAS DE VENCIMIENTO -
        if (startDate != null && endDate != null) {
            LocalDate start = parseDate(startDate);
            LocalDate end = parseDate(endDate);
            if (start != null && end != null) {
                result = result.stream()
                        .filter(r -> {
                            LocalDate maturity = parseDate(r.getMaturityDate());
                            return maturity != null && !maturity.isBefore(start) && !maturity.isAfter(end);
                        })
                        .toList();
            }
        }

        // - Filtro por IMPORTE -
        if (importValue != null) {
            result = result.stream()
                    .filter(r -> Math.abs(parseAmount(r.getAmount()) - importValue) < 0.005)
                    .toList();
        }

        // - Filtro por ESTADO DE PÓLIZA -
        if (state != null && !state.isBlank()) {
            result = result.stream()
                    .filter(r -> state.equalsIgnoreCase(r.getPolicyState()))
                    .toList();
        }

        result = applyOrder(new ArrayList<>(result), orderBy);
        return result;
    }


    // -- FUNCION "Ordenar por:" --
    private List<Renovation> applyOrder(List<Renovation> data, String orderBy) {
        if (orderBy == null || orderBy.isBlank()) return data;

        Comparator<Renovation> comparator = switch (orderBy) {
            case "mayor-importe" -> Comparator.comparingDouble((Renovation r) -> parseAmount(r.getAmount())).reversed();
            case "menor-importe" -> Comparator.comparingDouble(r -> parseAmount(r.getAmount()));
            case "mas-recientes" -> Comparator.comparing((Renovation r) -> parseContractDate(r.getContractDate())).reversed();
            case "menos-recientes" -> Comparator.comparing(r -> parseContractDate(r.getContractDate()));
            default -> Comparator.comparing(Renovation::getPolicyNumber);
        };

        data.sort(comparator);
        return data;
    }


    // -- FUNCION "Paginación" --
    public PagedResponse getPage(List<Renovation> data, int page, int size) {
        int total = data.size();
        int totalPages = size > 0 ? (int) Math.ceil((double) total / size) : 1;
        int currentPage = Math.max(1, Math.min(page, Math.max(totalPages, 1)));

        int start = (currentPage - 1) * size;                         
        int end = Math.min(start + size, total);                    

        List<Renovation> pageData = (start < total) ? data.subList(start, end) : List.of();

        return new PagedResponse<>(pageData, currentPage, totalPages, total, size, allRenovations.size());
    }


    // -- Convierte un STRING "dd/MM/yyyy" a LOCALDATE.
    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        try {
            return LocalDate.parse(dateStr.trim(), DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            return null;
        }
    }

    private LocalDate parseContractDate(String dateStr) {
        LocalDate parsed = parseDate(dateStr);
        return parsed != null ? parsed : LocalDate.MIN;
    }

    // -- Convierte STRING "1.234,56 €" a DOUBLE 1234.56 --
    private double parseAmount(String amount) {
        if (amount == null) return 0.0;
        String normalized = amount
                .replaceAll("\\.", "")
                .replace(",", ".")
                .replaceAll("[^0-9.-]", "");
        try {
            return Double.parseDouble(normalized);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
}
