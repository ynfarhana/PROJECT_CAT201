package com.ecommerce;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@WebServlet("/api/admin/orders")
public class AdminOrderServlet extends HttpServlet {

    private Gson gson = new Gson();

    private void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // 1. GET: Fetch all orders for the Admin Table
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        FirebaseInit.initialize(); // Ensure DB is connected
        OrderService orderService = new OrderService();
        
        List<Map<String, Object>> orders = orderService.getAllOrders();
        
        // Convert list to JSON and send to React
        out.print(gson.toJson(orders));
        out.flush();
    }

    // 2. POST: Update Status (Mark as Shipped)
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        
        String orderId = req.getParameter("orderId");
        String status = req.getParameter("status"); // e.g., "Shipped" or "Delivered"

        OrderService orderService = new OrderService();
        boolean success = orderService.updateOrderStatus(orderId, status);

        if (success) {
            resp.getWriter().write("{\"success\":true}");
        } else {
            resp.getWriter().write("{\"success\":false}");
        }
    }
}
