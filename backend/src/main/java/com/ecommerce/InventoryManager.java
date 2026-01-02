package com.ecommerce;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class InventoryManager {

    // Feature: Add Product to Firebase
    public String addProduct(String name, String category, double price, int stock) {
        // 1. Get the connection to the database
        Firestore db = FirestoreClient.getFirestore();

        // 2. Create the product data
        Map<String, Object> product = new HashMap<>();
        product.put("name", name);
        product.put("category", category);
        product.put("price", price);
        product.put("stock", stock);

        // 3. Save it to a collection called "products"
        // The system will generate a random unique ID for the product
        ApiFuture<WriteResult> result = db.collection("products").document().set(product);

        try {
            // Wait for the server to say "Saved!"
            return result.get().getUpdateTime().toString();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null;
        }
    }

        // Feature: Delete Product by Name
    public boolean deleteProduct(String name) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            // 1. Find the product with this name
            CollectionReference products = db.collection("products");
            Query query = products.whereEqualTo("name", name);
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

            if (documents.isEmpty()) {
                System.out.println("Delete Failed: Product not found.");
                return false;
            }

            // 2. Delete it (Delete the first match found)
            for (DocumentSnapshot document : documents) {
                document.getReference().delete();
                System.out.println("Deleted product: " + name);
            }
            return true;

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Feature: Get All Products
    public List<Map<String, Object>> getAllProducts() {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> productList = new ArrayList<>();
        
        try {
            // 1. Get all documents from "products" collection
            ApiFuture<QuerySnapshot> future = db.collection("products").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            
            // 2. Convert them to a simple Map (Dictionary)
            for (DocumentSnapshot document : documents) {
                Map<String, Object> product = document.getData();
                // Add the ID so we can track it later if needed
                product.put("id", document.getId()); 
                productList.add(product);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return productList;
    }
}