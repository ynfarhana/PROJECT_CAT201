package com.ecommerce;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.IOException;
import java.io.InputStream;

public class FirebaseInit {

    // A flag to make sure we don't try to connect twice
    private static boolean isInitialized = false;

    public static void initialize() {
        if (isInitialized) return; // Already connected!

        try {
            // Read the key file from the resources folder
            InputStream serviceAccount = FirebaseInit.class.getClassLoader()
                    .getResourceAsStream("serviceAccountKey.json");

            if (serviceAccount == null) {
                System.out.println("ERROR: Could not find serviceAccountKey.json");
                return;
            }

            // Set up the options
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // Connect!
            FirebaseApp.initializeApp(options);
            isInitialized = true;
            System.out.println("SUCCESS: Firebase Connected!");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}