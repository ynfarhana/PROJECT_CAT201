package com.ecommerce;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// The URL that React will call: http://localhost:8080/api/admin/login
@WebServlet(name = "AdminLoginServlet", urlPatterns = {"/admin/login"}, loadOnStartup = 1)
public class AdminLoginServlet extends HttpServlet {

    // 1. Handle CORS (Allow React to talk to Java)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    public void init() throws ServletException {
        // This runs automatically when the server starts!
        System.out.println("------------------------------------");
        System.out.println("Checking Firebase Connection...");
        FirebaseInit.initialize();
        System.out.println("------------------------------------");
    }
    
    // 2. Handle the Login Request (POST)
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. Initialize DB
        FirebaseInit.initialize();
        setAccessControlHeaders(response);
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // 2. Read the JSON Body
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String jsonReceived = sb.toString();
        
        // DEBUG: See what React sent
        System.out.println("Received: " + jsonReceived);

        // 3. Extract Username/Password (The "Poor Man's JSON Parser")
        // Assuming format: {"username":"iman", "password":"123"}
        String username = extractValue(jsonReceived, "username");
        String password = extractValue(jsonReceived, "password");

        // 4. Check the Database!
        boolean isValid = Admin.verifyLogin(username, password);

        // 5. Send Reply
        if (isValid) {
            out.print("{\"status\":\"success\", \"message\":\"Login Approved\", \"role\":\"admin\"}");
        } else {
            // Send a 401 Unauthorized error code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"status\":\"fail\", \"message\":\"Invalid Credentials\"}");
        }
        out.flush();
    }

    // Helper function to extract values from JSON string
    private String extractValue(String json, String key) {
        try {
            String search = "\"" + key + "\":\"";
            int start = json.indexOf(search) + search.length();
            int end = json.indexOf("\"", start);
            return json.substring(start, end);
        } catch (Exception e) {
            return "";
        }
    }

    // Helper method for CORS headers
    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow React Port
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}