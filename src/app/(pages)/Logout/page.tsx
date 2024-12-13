"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if the component is unmounted

    const handleLogout = async () => {
      try {
        // Remove user data from localStorage
        localStorage.removeItem("user");

        // Optional: Call your authentication service's logout method
        // await authService.logout();  // Uncomment if applicable

        if (isMounted) {
          setLoading(false); // Stop loading
          router.push("/users"); // Redirect to the desired page
        }
      } catch (error) {
        console.error("Logout failed:", error);
        // Optional: Display an error message or take fallback action
      }
    };

    handleLogout();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [router]);

  if (loading) {
    return <div>Logging out...</div>; // Display a message while processing
  }

  return null; // Return null after logout
};

export default LogoutPage;
