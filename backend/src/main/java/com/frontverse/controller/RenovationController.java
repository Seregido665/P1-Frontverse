package com.frontverse.controller;

import com.frontverse.dto.PagedResponse;
import com.frontverse.model.Renovation;
import com.frontverse.service.RenovationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController     // - Marca esta clase como controlador que devuelve el JSON. -
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permite peticiones desde Vercel (origen distinto al backend en Render)
public class RenovationController {

    // - Inyecta RenovationService. -
    @Autowired
    private RenovationService renovationService;


    // - Recibe filtros, orden y paginación y aplica el GET. -
    @GetMapping("/renovations")
    public ResponseEntity<PagedResponse> getRenovations(
            @RequestParam(required = false) List<String> riskNames,  // Acepta varios.
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Double importValue,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String orderBy,
            @RequestParam(defaultValue = "1")  int page,             
            @RequestParam(defaultValue = "10") int size          
    ) {
        List<Renovation> filtered = renovationService.filterAndSort(
                riskNames, startDate, endDate, importValue, state, orderBy
        );
        PagedResponse response = renovationService.getPage(filtered, page, size);
        return ResponseEntity.ok(response);
    }


    // - Devuelve todas las pólizas. -
    @GetMapping("/renovations/all")
    public ResponseEntity<List<Renovation>> getAllRenovations() {
        return ResponseEntity.ok(renovationService.getAllRenovations());
    }
}
