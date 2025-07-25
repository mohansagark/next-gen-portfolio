"use client";

import { useEffect, useState } from "react";
import getBlogs from "@/libs/getBlogs";
import getPortfolio from "@/libs/getPortfolio";
import getSkills from "@/libs/getSkills";
import getTestimonials from "@/libs/getTestimonials";

const DataTest = () => {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    console.log("🧪 Testing data loading...");

    try {
      const blogs = getBlogs();
      const portfolio = getPortfolio();
      const skills = getSkills();
      const testimonials = getTestimonials();

      const data = {
        blogs: {
          raw: blogs,
          length: blogs?.length || 0,
          type: typeof blogs,
          isArray: Array.isArray(blogs),
        },
        portfolio: {
          raw: portfolio,
          length: portfolio?.length || 0,
          type: typeof portfolio,
          isArray: Array.isArray(portfolio),
        },
        skills: {
          raw: skills,
          length: skills?.length || 0,
          type: typeof skills,
          isArray: Array.isArray(skills),
        },
        testimonials: {
          raw: testimonials,
          length: testimonials?.length || 0,
          type: typeof testimonials,
          isArray: Array.isArray(testimonials),
        },
      };

      console.log("🔍 Test data:", data);
      setTestData(data);
    } catch (error) {
      console.error("❌ Test error:", error);
      setTestData({ error: error.message });
    }
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Data Loading Test</h1>

      {testData ? (
        <div className="space-y-6">
          {testData.error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {testData.error}
            </div>
          ) : (
            <>
              {Object.entries(testData).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-6 shadow">
                  <h2 className="text-xl font-semibold mb-4 capitalize">
                    {key}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Length:</strong> {value.length}
                    </div>
                    <div>
                      <strong>Type:</strong> {value.type}
                    </div>
                    <div>
                      <strong>Is Array:</strong> {value.isArray ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Has Data:</strong> {value.raw ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="mt-4">
                    <strong>Raw Data (first 100 chars):</strong>
                    <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                      {JSON.stringify(value.raw, null, 2).substring(0, 100)}...
                    </pre>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div>Loading test data...</div>
      )}
    </div>
  );
};

export default DataTest;
