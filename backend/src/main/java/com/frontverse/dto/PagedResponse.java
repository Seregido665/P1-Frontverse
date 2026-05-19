package com.frontverse.dto;

import com.frontverse.model.Renovation;
import java.util.List;

public class PagedResponse {
    private List<Renovation> data; 
    private int currentPage;        
    private int totalPages;         
    private int totalItems;       
    private int pageSize;           
    private int originalTotal;    

    // - CONSTRUCTOR -
    public PagedResponse(List<Renovation> data, int currentPage, int totalPages, int totalItems, int pageSize, int originalTotal) {
        this.data = data;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        this.pageSize = pageSize;
        this.originalTotal = originalTotal;
    }

    // - Getters para generar el JSON final. -
    public List<Renovation> getData() { return data; }
    public int getCurrentPage() { return currentPage; }
    public int getTotalPages() { return totalPages; }
    public int getTotalItems() { return totalItems; }
    public int getPageSize() { return pageSize; }
    public int getOriginalTotal() { return originalTotal; }
}
