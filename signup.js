// sign up.js

// Replace with your Supabase project credentials
const supabaseUrl = 'https://klhknooovqqdfxvevgtb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsaGtub29vdnFxZGZ4dmV2Z3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjU0MzgsImV4cCI6MjA4MDA0MTQzOH0.zjXcN6oK51K8pPD_xEo9OtGHb1qVhsZp5VqA0BH27Gw';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Select the form and inputs
const signupForm = document.querySelector('#signup-form');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const accountType = document.querySelector('#account_type').value;

    // Validate password against pattern
    const pattern = new RegExp(passwordInput.pattern);
    if (!pattern.test(password)) {
        alert(passwordInput.title);
        passwordInput.focus();
        return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        confirmPasswordInput.focus();
        return;
    }

    // Optional: Check other fields
    if (!username || !email || !accountType) {
        alert("Please fill out all required fields.");
        return;
    }

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert(`Sign up failed: ${error.message}`);
    } else {
        alert('Sign up successful! Please check your email to verify your account.');
        signupForm.reset();
    }
});