"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

const LogoutPageContent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const handleLogout = async () => {
      try {
        localStorage.removeItem("user"); // Clear user data
        if (isMounted) {
          setLoading(false);
          router.push("/users"); // Redirect after logout
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return <div>Logging out...</div>; // Loading message
  }

  return null;
};

const LogoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogoutPageContent />
    </Suspense>
  );
};

export default LogoutPage;
