package com.ecommerce;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/admin/product")
public class ProductServlet extends HttpServlet {

    // 1. Handle CORS (Allow React to talk to Java)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // 2. Handle "Add Product" (POST)
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        FirebaseInit.initialize(); // Ensure DB is connected

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // READ the data sent by React
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String jsonReceived = sb.toString();
        
        System.out.println("Received Product Data: " + jsonReceived);

        // EXTRACT data (Manual Parsing)
        String name = extractValue(jsonReceived, "name");
        String category = extractValue(jsonReceived, "category");
        String subCategory = extractValue(jsonReceived, "subCategory");
        String priceStr = extractValue(jsonReceived, "price"); // Comes as string
        String stockStr = extractValue(jsonReceived, "stock"); // Comes as string
        String image = extractValue(jsonReceived, "image");

        // Convert numbers
        double price = 0.0;
        int stock = 0;
        try {
            price = Double.parseDouble(priceStr);
            stock = Integer.parseInt(stockStr);
        } catch (NumberFormatException e) {
            System.out.println("Error parsing numbers");
        }

        // SAVE to Firebase
        InventoryManager inv = new InventoryManager();
        String timestamp = inv.addProduct(name, category, subCategory, price, stock, image);

        // REPLY to React
        if (timestamp != null) {
            out.print("{\"status\":\"success\", \"message\":\"Product Saved!\", \"timestamp\":\"" + timestamp + "\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"status\":\"fail\", \"message\":\"Database Error\"}");
        }
        out.flush();
    }

        // 3. Handle "Delete Product" (DELETE)
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        FirebaseInit.initialize();

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // GET THE PRODUCT NAME from the URL parameter (e.g., ?name=Shirt)
        String nameToDelete = request.getParameter("name");

        if (nameToDelete == null || nameToDelete.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"fail\", \"message\":\"Missing product name\"}");
            return;
        }

        System.out.println("Request to delete: " + nameToDelete);

        InventoryManager inv = new InventoryManager();
        boolean isDeleted = inv.deleteProduct(nameToDelete);

        if (isDeleted) {
            out.print("{\"status\":\"success\", \"message\":\"Product Deleted Successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"status\":\"fail\", \"message\":\"Product not found\"}");
        }
        out.flush();
    }

        // 4. Handle "View All Products" (GET)
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        FirebaseInit.initialize();

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        InventoryManager inv = new InventoryManager();
        List<Map<String, Object>> products = inv.getAllProducts();

        // Manually build JSON Array
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < products.size(); i++) {
            Map<String, Object> p = products.get(i);
            
            json.append("{")
                .append("\"id\":\"").append(p.get("id")).append("\",") // <--- ADDED THIS (Needed for clicking items)
                .append("\"name\":\"").append(p.get("name")).append("\",")
                .append("\"category\":\"").append(p.get("category")).append("\",")
                .append("\"subCategory\":\"").append(p.get("subCategory")).append("\",") // <--- ADDED THIS (For filtering)
                .append("\"image\":\"").append(p.get("image")).append("\",") // <--- ADDED THIS (The missing image!)
                .append("\"price\":").append(p.get("price")).append(",")
                .append("\"stock\":").append(p.get("stock"))
                .append("}");

            // Add comma if not the last item
            if (i < products.size() - 1) {
                json.append(",");
            }
        }
        json.append("]");

        out.print(json.toString());
        out.flush();
    }

        // Helper: CORS Headers
        private void setAccessControlHeaders(HttpServletResponse resp) {
            resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            resp.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
            resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        }

    // Helper: Manual JSON Extractor (Same as AdminLoginServlet)
    private String extractValue(String json, String key) {
        try {
            // Searches for "key":"value" or "key":123
            String search = "\"" + key + "\":";
            int start = json.indexOf(search);
            if (start == -1) return "";
            
            start += search.length();
            
            // Check if the value starts with quote (String) or not (Number)
            char firstChar = json.charAt(start);
            if (firstChar == '"') {
                start++; // Skip opening quote
                int end = json.indexOf("\"", start);
                return json.substring(start, end);
            } else {
                // It's a number, find the next comma or closing brace
                int endComma = json.indexOf(",", start);
                int endBrace = json.indexOf("}", start);
                int end = (endComma == -1) ? endBrace : Math.min(endComma, endBrace);
                if (end == -1) end = endBrace; 
                return json.substring(start, end).trim();
            }
        } catch (Exception e) {
            return "";
        }
    }
}