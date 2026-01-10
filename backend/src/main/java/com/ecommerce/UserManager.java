package com.ecommerce;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserManager {

    // 1. REGISTER: Create a new user
    public String registerUser(String username, String email, String password) {
        Firestore db = FirestoreClient.getFirestore();

        try {
            // Check if email already exists
            CollectionReference users = db.collection("users");
            Query query = users.whereEqualTo("email", email);
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            
            if (!querySnapshot.get().isEmpty()) {
                return "EMAIL_EXISTS";
            }

            // If not, save new user
            Map<String, Object> user = new HashMap<>();
            user.put("username", username);
            user.put("email", email);
            user.put("password", password); // (Security Note: In real apps, we encrypt this!)
            user.put("created_at", System.currentTimeMillis());

            db.collection("users").add(user);
            return "SUCCESS";

        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }

    // 2. LOGIN: Check email and password
    public Map<String, Object> loginUser(String email, String password) {
        Firestore db = FirestoreClient.getFirestore();

        try {
            // Search for user by email
            CollectionReference users = db.collection("users");
            Query query = users.whereEqualTo("email", email);
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

            if (documents.isEmpty()) {
                return null; // Email not found
            }

            // Check if password matches
            QueryDocumentSnapshot userDoc = documents.get(0);
            String storedPassword = userDoc.getString("password");

            if (storedPassword != null && storedPassword.equals(password)) {
                // Password Correct! Return user info (but not the password)
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", userDoc.getId());
                userData.put("username", userDoc.getString("username"));
                userData.put("email", userDoc.getString("email"));
                return userData;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null; // Login failed
    }
}