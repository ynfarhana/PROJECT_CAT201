package com.ecommerce;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

// CHANGED URL: Removed the wildcards (*) to be safer
@WebServlet(urlPatterns = {"/auth/signup", "/auth/login"})
public class AuthServlet extends HttpServlet {

    // 1. CORS Headers (CRITICAL FOR CONNECTION)
    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Strict for now
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // 2. Handle the "Knock" (Preflight)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // 3. Handle the Data (POST)
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        
        // Initialize DB connection
        try {
            FirebaseInit.initialize(); 
        } catch (Exception e) {
            System.out.println("Firebase Load Error: " + e.getMessage());
        }

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        String path = req.getServletPath(); // Get the URL path
        
        // Read JSON
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = req.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        String jsonReceived = sb.toString();
        System.out.println("Auth Request (" + path + "): " + jsonReceived);

        UserManager userManager = new UserManager();

        // LOGIC
        if (path.contains("signup")) {
            String username = extractValue(jsonReceived, "username");
            String email = extractValue(jsonReceived, "email");
            String password = extractValue(jsonReceived, "password");

            String result = userManager.registerUser(username, email, password);

            if ("SUCCESS".equals(result)) {
                out.print("{\"success\":true, \"message\":\"User registered!\"}");
            } else if ("EMAIL_EXISTS".equals(result)) {
                out.print("{\"success\":false, \"message\":\"Email already in use.\"}");
            } else {
                out.print("{\"success\":false, \"message\":\"Server error.\"}");
            }
        } else if (path.contains("login")) {
            String email = extractValue(jsonReceived, "email");
            String password = extractValue(jsonReceived, "password");

            Map<String, Object> user = userManager.loginUser(email, password);

            if (user != null) {
                out.print("{"
                    + "\"success\":true, "
                    + "\"token\":\"fake-jwt-token\", " 
                    + "\"user\": {"
                        + "\"id\":\"" + user.get("id") + "\", "
                        + "\"username\":\"" + user.get("username") + "\", "
                        + "\"email\":\"" + user.get("email") + "\""
                    + "}"
                + "}");
            } else {
                out.print("{\"success\":false, \"message\":\"Invalid email or password.\"}");
            }
        }
        out.flush();
    }

    // Manual JSON Extractor
    private String extractValue(String json, String key) {
        try {
            String search = "\"" + key + "\":";
            int start = json.indexOf(search);
            if (start == -1) return "";
            start += search.length();
            
            char firstChar = json.charAt(start);
            if (firstChar == '"') {
                start++; 
                int end = json.indexOf("\"", start);
                return json.substring(start, end);
            } else {
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