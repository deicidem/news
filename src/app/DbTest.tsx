"use client";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  name: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Post[];
  error?: string;
}

const DbTest = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/db-test");
        const data = (await response.json()) as ApiResponse;

        setApiResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiResponse({
          success: false,
          message: "Error fetching data",
          error: String(error),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!apiResponse) {
    return <p>No response</p>;
  }

  return (
    <div>
      <h2>Database Test</h2>

      {apiResponse.success ? (
        <>
          <p>Message: {apiResponse.message}</p>
          {apiResponse.data && apiResponse.data.length > 0 ? (
            <ul>
              {apiResponse.data.map((post) => (
                <li key={post.id}>
                  <p>
                    <strong>ID:</strong> {post.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {post.name}
                  </p>
                  <p>
                    <strong>Created by ID:</strong> {post.createdById}
                  </p>
                  <p>
                    <strong>Created at:</strong> {post.createdAt}
                  </p>
                  <p>
                    <strong>Updated at:</strong> {post.updatedAt}
                  </p>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found.</p>
          )}
        </>
      ) : (
        <>
          <p>Message: {apiResponse.message}</p>
          <p>Error: {apiResponse.error}</p>
        </>
      )}
    </div>
  );
};

export default DbTest;
