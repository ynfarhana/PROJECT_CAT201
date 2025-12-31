package com.ecommerce;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot; 
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import java.util.List;
import java.util.concurrent.ExecutionException;

public class Admin {
    
    // Feature: Login Verification
    public static boolean verifyLogin(String username, String password) {
        Firestore db = FirestoreClient.getFirestore();
        
        try {
            // 1. Create a query: Find documents where 'username' equals the input
            CollectionReference admins = db.collection("admins");
            Query query = admins.whereEqualTo("username", username);
            
            // 2. Execute the query
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

            // 3. Check results
            if (documents.isEmpty()) {
                System.out.println("Login Failed: User not found.");
                return false;
            }

            // 4. Check password (Get the first result found)
            // It is safe to store a QueryDocumentSnapshot inside a DocumentSnapshot variable
            DocumentSnapshot adminDoc = documents.get(0);
            String storedPassword = adminDoc.getString("password");

            if (storedPassword != null && storedPassword.equals(password)) {
                System.out.println("Login Success: Welcome " + username);
                return true;
            } else {
                System.out.println("Login Failed: Wrong password.");
                return false;
            }

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return false;
        }
    }
}