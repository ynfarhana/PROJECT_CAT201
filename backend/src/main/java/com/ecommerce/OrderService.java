package com.ecommerce;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import java.util.concurrent.ExecutionException;

public class OrderService {
    public void saveOrderToFirebase(Order order) throws Exception {
        try {
            Firestore db = FirestoreClient.getFirestore();
            
            // This creates a "orders" collection in Firebase
            db.collection("orders")
            .document(order.getOrderId()) 
            .set(order.toMap());
                
              
            System.out.println("✅ Order saved to Firebase: " + order.getOrderId());
        } catch (Exception e) {
            throw new Exception("Firebase Error: " + e.getMessage());
        }
    }

    // Add this inside your OrderService class
    public void saveCartItemToFirebase(CartItem item) throws Exception {
        try {
            Firestore db = FirestoreClient.getFirestore();
            
            
            db.collection("current_carts")
            .document(item.getProductId()) 
            .set(item) // Firestore can automatically convert simple Java objects
            .get(); 
            
            System.out.println("✅ Cart Item synced to Firebase: " + item.getName());
        } catch (InterruptedException | ExecutionException e) {
            throw new Exception("Firebase Cart Sync Error: " + e.getMessage());
        }
    }

    public void updateOrderStatusInFirebase(String orderId, String newStatus) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("orders").document(orderId).update("status", newStatus).get();
        System.out.println("✅ Order " + orderId + " updated to: " + newStatus);
    }
}