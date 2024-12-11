"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLogout = () => {
      // Remove the user data from localStorage
      localStorage.removeItem("user");

      // Optional: If you're using an authentication service, call its logout method here
      // For example:
      // authService.logout();  // Example for Auth0 or Firebase

      // Set loading to false after removing user data and completing logout tasks
      setLoading(false);

      // Redirect after logout
      router.push("/users");
    };

    handleLogout();
  }, [router]);

  if (loading) {
    return <div>Logging out...</div>; // Display a loading message while the logout is in progress
  }

  return <div></div>;
};

export default Page;
