package com.ecommerce;

import java.util.ArrayList;
import java.util.List;

public class InventoryManager {
    // This list mimics a database for now
    private List<String> productList; 

    public InventoryManager() {
        this.productList = new ArrayList<>();
    }

    // Feature: Add Product
    public void addProduct(String productName) {
        // Later, we will save this to the SQL Database
        productList.add(productName);
        System.out.println("Product added: " + productName);
    }

    // Feature: Remove Product
    public boolean removeProduct(String productName) {
        if (productList.contains(productName)) {
            productList.remove(productName);
            System.out.println("Product removed: " + productName);
            return true;
        }
        return false;
    }

    // Feature: View All Products
    public List<String> getAllProducts() {
        return productList;
    }
}