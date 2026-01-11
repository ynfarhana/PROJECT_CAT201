package com.ecommerce;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.WriteResult;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
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

    // Get All Orders (For Admin Dashboard)
    public List<Map<String, Object>> getAllOrders() {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> orderList = new ArrayList<>();

        try {
            // Get all documents from "orders" collection
            ApiFuture<QuerySnapshot> future = db.collection("orders").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            for (DocumentSnapshot document : documents) {
                // Convert document to a Map
                Map<String, Object> orderData = document.getData();
                orderList.add(orderData);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return orderList;
    }

    // Update Order Status (For "Track Order")
    public boolean updateOrderStatus(String orderId, String newStatus) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentReference orderRef = db.collection("orders").document(orderId);
            // Update just the "status" field (e.g., from "Pending" to "Shipped")
            ApiFuture<WriteResult> future = orderRef.update("status", newStatus);
            future.get(); // Wait for it to finish
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

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
}