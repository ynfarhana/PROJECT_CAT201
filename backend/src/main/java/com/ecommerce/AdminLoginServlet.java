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
@WebServlet("/api/admin/login")
public class AdminLoginServlet extends HttpServlet {

    // 1. Handle CORS (Allow React to talk to Java)
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // 2. Handle the Login Request (POST)
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        
        // Setup JSON response type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        // READ the data sent by React
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String jsonReceived = sb.toString();
        
        // DEBUG: Print what we received to the VS Code Terminal
        System.out.println("React sent: " + jsonReceived);

        // TODO: Later we will parse this JSON and check Firebase!
        // For now, let's pretend the login is always successful to test connection.
        
        // SEND response back to React
        String jsonResponse = "{\"status\":\"success\", \"message\":\"Login approved by Java Backend!\"}";
        out.print(jsonResponse);
        out.flush();
    }

    // Helper method for CORS headers
    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow React Port
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}