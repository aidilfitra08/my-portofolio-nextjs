"use client";

import { useEffect, useState } from "react";

export default function IPCheckerPage() {
  const [ipInfo, setIpInfo] = useState<{
    ip: string;
    loading: boolean;
    error: string | null;
  }>({
    ip: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchIP = async () => {
      try {
        // Using a public IP API service
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpInfo({
          ip: data.ip,
          loading: false,
          error: null,
        });
      } catch (error) {
        setIpInfo({
          ip: "",
          loading: false,
          error: "Failed to fetch IP address and Error: " + error,
        });
      }
    };

    fetchIP();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ipInfo.ip);
    alert("IP address copied to clipboard!");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Your IP Address
        </h1>

        {ipInfo.loading && <div className="text-gray-600">Loading...</div>}

        {ipInfo.error && (
          <div className="text-red-600 mb-4">{ipInfo.error}</div>
        )}

        {ipInfo.ip && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="text-3xl font-mono font-bold text-blue-600">
                {ipInfo.ip}
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Copy IP Address
            </button>

            {/* <div className="text-sm text-gray-600 mt-4">
              <p>
                Add this IP to the{" "}
                <code className="bg-gray-200 px-1 rounded">ALLOWED_IPS</code>{" "}
                array in your middleware file:
              </p>
              <code className="block mt-2 p-2 bg-gray-100 rounded text-left text-xs">
                src/middleware.ts
              </code>
            </div> */}
          </div>
        )}
      </div>
    </main>
  );
}
