package com.ecommerce;
import com.ecommerce.Order;
import com.ecommerce.OrderService;
import com.ecommerce.CartItem;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    private final Gson gson = new Gson();

    // CORS helper
    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // 1. GET: Fetch the current cart items for the GUI
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        HttpSession session = request.getSession();
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        
        if (cart == null) {
            cart = new ArrayList<>();
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(cart));
    }

    // 2. POST: Handle Add, Remove, and Checkout actions
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setAccessControlHeaders(response);
        HttpSession session = request.getSession();
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }

        String action = request.getParameter("action");

        try {
            if ("add".equals(action)) {
                handleAdd(request, cart);
            } 
            else if ("remove".equals(action)) {
                handleRemove(request, cart);
            } 
            else if ("checkout".equals(action)) {
                handleCheckout(request, session, cart);
            }

            session.setAttribute("cart", cart);
            response.setStatus(HttpServletResponse.SC_OK);
            
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // Logic for Adding items
    private void handleAdd(HttpServletRequest request, List<CartItem> cart) {
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        double price = Double.parseDouble(request.getParameter("price"));

        CartItem newItem = null;
        boolean exists = false;

        for (CartItem item : cart) {
            if (item.getProductId().equals(id)) {
                item.setQuantity(item.getQuantity() + 1);
                newItem = item;
                exists = true;
                break;
            }
        }

        if (!exists) {
            newItem = new CartItem(id, name, price, 1);
            cart.add(newItem);
        }

        // NEW: Save this specific addition to Firebase immediately
        try {
            OrderService orderService = new OrderService();
            // You might need to create a new method in OrderService called 'saveCartItem'
            orderService.saveCartItemToFirebase(newItem); 
            System.out.println("SUCCESS: Item saved to Firebase cart collection.");
        } catch (Exception e) {
            System.err.println("Firebase Sync Failed: " + e.getMessage());
        }
    }

    // Logic for Removing items
    private void handleRemove(HttpServletRequest request, List<CartItem> cart) {
        String id = request.getParameter("id");
        // Find the item in the cart
    for (int i = 0; i < cart.size(); i++) {
        CartItem item = cart.get(i);
        
        if (item.getProductId().equals(id)) {
            // If quantity is more than 1, just decrease it
            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
            } 
            // If quantity is 1, remove the item from the list entirely
            else {
                cart.remove(i);
            }
            
            // Exit the loop once we've handled the item
            return;
        }
    }
    }

    
    private void handleCheckout(HttpServletRequest request, HttpSession session, List<CartItem> cart) throws Exception {
    // Validation: Don't process empty carts
    if (cart == null || cart.isEmpty()) {
        throw new Exception("Cannot checkout with an empty cart.");
    }

    // Data Collection: Get user details from the request
    String email = request.getParameter("email");
    String fullName = request.getParameter("fullName");
    String phone = request.getParameter("phone");
    String shippingAddress = request.getParameter("address");
    String message = request.getParameter("message");

    if (email == null || fullName == null || shippingAddress == null) {
        throw new Exception("Missing required shipping details.");
    }

    // Order Creation (OOP Logic)
    String orderId = "THRIFT-" + System.currentTimeMillis();
    
    // Calculate final total using Java Streams
    double total = cart.stream().mapToDouble(CartItem::getSubtotal).sum();
    com.ecommerce.Order newOrder = new com.ecommerce.Order(orderId, email, fullName, phone, shippingAddress, cart, total);

    if (message != null && !message.isEmpty()) {
    newOrder.setMessage(message);
}
    // Persistence: Save to Firebase
    try {
        OrderService orderService = new OrderService();
        orderService.saveOrderToFirebase(newOrder);
        cart.clear();
        session.setAttribute("cart", cart);
        System.out.println("Order " + orderId + " received from " + fullName);
    } catch (Exception e) {
        System.err.println("Firebase Order Placement Failed: " + e.getMessage());
        throw new Exception("Database error: Unable to save your order.");
    }
    }
}