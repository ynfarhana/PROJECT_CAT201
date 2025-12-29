package com.ecommerce;

public class Admin {
    private int adminId;
    private String username;
    private String password; // In real life, we hash this!
    private String role; // e.g., "SuperAdmin", "Editor"

    // Constructor
    public Admin(int id, String username, String password) {
        this.adminId = id;
        this.username = username;
        this.password = password;
        this.role = "Administrator";
    }

    // Login Method (Logic only, no GUI)
    public boolean login(String inputUser, String inputPass) {
        return this.username.equals(inputUser) && this.password.equals(inputPass);
    }

    // Getters
    public String getUsername() { return username; }
}