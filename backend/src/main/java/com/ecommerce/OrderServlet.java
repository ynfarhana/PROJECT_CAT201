package com.ecommerce;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/admin/orders")
public class OrderServlet extends HttpServlet {
    private OrderService orderService = new OrderService();

    // GET: Admin requests all orders for the dashboard
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            // Logic to fetch all orders from Firebase
            // response.getWriter().write(jsonList);
        } catch (Exception e) {
            response.setStatus(500);
        }
    }

    // POST: Admin updates order status (e.g., Shipped)
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String orderId = request.getParameter("orderId");
        String newStatus = request.getParameter("status");
        
        try {
            orderService.updateOrderStatusInFirebase(orderId, newStatus);
            response.getWriter().write("{\"status\": \"success\"}");
        } catch (Exception e) {
            response.getWriter().write("{\"status\": \"error\"}");
        }
    }
}
