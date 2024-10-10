"use client"; // Next.js Client Component

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function FacebookTest() {
  const { data: session } = useSession();
  const [longLivedToken, setLongLivedToken] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [insights, setInsights] = useState(null);

  // Function to exchange short-lived token for long-lived token
  const exchangeToken = async (shortLivedToken) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`
      );
      const data = await response.json();
      console.log("Long-lived token:", data.access_token);
      setLongLivedToken(data.access_token);
    } catch (error) {
      console.error("Error exchanging token:", error);
    }
  };

  // Function to get the list of Facebook Pages
  const getPages = async (accessToken) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v17.0/me/accounts?access_token=${accessToken}`
      );
      const data = await response.json();
      console.log("Pages:", data);
      setPageId(data.data[0]?.id); // Assuming the user has at least one page
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  // Function to get Instagram Insights
  const getInstagramInsights = async (accessToken, igBusinessAccountId) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v17.0/${igBusinessAccountId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${accessToken}`
      );
      const data = await response.json();
      console.log("Instagram Insights:", data);
      setInsights(data);
    } catch (error) {
      console.error("Error fetching Instagram insights:", error);
    }
  };

  // When the user logs in with Facebook, exchange the token
  const handleFacebookLogin = async () => {
    if (session?.accessToken) {
      console.log("Short-lived token:", session.accessToken);
      // Exchange the short-lived token for a long-lived one
      exchangeToken(session.accessToken);
    }
  };
  useEffect(() => {
    console.log(session);
  }, []);

  // Button to log out
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="bg-red-300">
      {!session ? (
        <button onClick={handleFacebookLogin}>Get Long lived Token</button>
      ) : (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={handleLogout}>Log out</button> <br />
          <br />
          <button onClick={handleFacebookLogin}>Get Long lived Token</button>
          {longLivedToken && (
            <>
              <div className="bg-green-200">
                <button onClick={() => getPages(longLivedToken)}>
                  Get Pages
                </button>

                {pageId && (
                  <button
                    onClick={() => getInstagramInsights(longLivedToken, pageId)}
                  >
                    Get Instagram Insights
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
