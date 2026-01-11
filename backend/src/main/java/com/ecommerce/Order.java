
package com.ecommerce;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Date;

public class Order {
    private String orderId;
    private String userEmail;
    private String fullName;
    private String phone;           
    private String shippingAddress;
    private List<CartItem> items;
    private double totalAmount;
    private Date orderDate;

    public Order(String orderId, String userEmail, String fullName, String phone, String shippingAddress, List<CartItem> items, double totalAmount) {
        this.orderId = orderId;
        this.userEmail = userEmail;
        this.fullName = fullName;
        this.phone = phone;
        this.shippingAddress = shippingAddress;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderDate = new Date();
    }

    // Add these inside your Order class in Order.java
    public String getOrderId() {
        return orderId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getFullName() { 
        return fullName; 
    }

    public String getPhone() { 
        return phone; 
    }

    public String getShippingAddress() { 
        return shippingAddress;
 }

    public List<CartItem> getItems() {
        return items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    /* Helper method to convert Order object to a Firebase-friendly Map*/
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("orderId", orderId);
        map.put("userEmail", userEmail);
        map.put("fullName", fullName);
        map.put("phone", phone);               
        map.put("shippingAddress", shippingAddress);
        map.put("totalAmount", totalAmount);
        map.put("status", "Pending");
        map.put("timestamp", System.currentTimeMillis());
        
        // Convert items to a list of maps
        List<Map<String, Object>> itemMaps = items.stream().map(item -> {
            Map<String, Object> itemMap = new HashMap<>();
            itemMap.put("name", item.getName());
            itemMap.put("price", item.getPrice());
            itemMap.put("quantity", item.getQuantity());
            return itemMap;
        }).collect(Collectors.toList());
        
        map.put("items", itemMaps);
        return map;
    }
}