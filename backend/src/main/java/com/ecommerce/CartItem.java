package com.ecommerce;

public class CartItem implements java.io.Serializable {
    private String productId;
    private String name;
    private double price;
    private int quantity;

    // Constructor
    public CartItem(String productId, String name, double price, int quantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters
    public String getProductId() { return productId; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    // Setter for quantity (Required for your handleAdd/handleRemove logic)
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Helper for calculations
    public double getSubtotal() {
        return this.price * this.quantity;
    }
}