"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCopy,
  faArrowLeft,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchIP = async () => {
      try {
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
          error: "Failed to fetch IP address: " + error,
        });
      }
    };

    fetchIP();
  }, []);

  const copyToClipboard = () => {
    if (!ipInfo.ip) return;
    navigator.clipboard.writeText(ipInfo.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono relative overflow-hidden p-6">
      {/* Vintage scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Back button */}
        <Link
          href="/playground"
          className="group inline-flex items-center gap-3 mb-8 px-4 py-2 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#1a1a1a] text-sm transition-all hover:translate-x-1 hover:-translate-y-1 relative"
        >
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-neutral-900 dark:text-accent-green group-hover:animate-pulse"
          />
          <span className="text-neutral-900 dark:text-[#e0e0e0] font-bold tracking-wide">
            <span className="text-neutral-500 dark:text-accent-green">[</span>
            RETURN_PLAYGROUND
            <span className="text-neutral-500 dark:text-accent-green">]</span>
          </span>
        </Link>

        {/* Header */}
        <div className="mb-8 border-b-2 border-accent-green pb-4 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faGlobe}
            className="text-2xl text-neutral-900 dark:text-accent-green"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">[IP_CHECKER]</h1>
            <p className="text-sm text-neutral-600 dark:text-[#999] mt-1">
              <span className="text-[#ffb000]">$</span> whoami --ip
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="relative">
          {/* Shadow */}
          <div className="absolute inset-0 border-2 border-neutral-900 dark:border-accent-green translate-x-2 translate-y-2 -z-10 opacity-70"></div>

          <div className="border-2 border-accent-green bg-[#faf8f3] dark:bg-[#1a1a1a] p-6 md:p-8 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent-green"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent-green"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent-green"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent-green"></div>

            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon
                icon={faWifi}
                className="text-lg text-accent-green"
              />
              <h2 className="text-xl font-bold tracking-wide">CURRENT_IP</h2>
            </div>

            {ipInfo.loading && (
              <div className="text-neutral-600 dark:text-[#999]">
                Fetching...
              </div>
            )}

            {ipInfo.error && (
              <div className="text-red-500 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded p-3 text-sm">
                {ipInfo.error}
              </div>
            )}

            {ipInfo.ip && (
              <div className="space-y-5">
                <div className="border-2 border-accent-green bg-[#0a0a0a] text-accent-green rounded p-5 text-center">
                  <div className="text-3xl font-mono font-bold wrap-break-words">
                    {ipInfo.ip}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">public_ipv4</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 px-4 py-3 border-2 border-accent-green bg-accent-green text-white dark:text-[#0d0d0d] font-bold tracking-wide rounded hover:bg-transparent hover:text-accent-green transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                    {copied ? "Copied" : "Copy IP"}
                  </button>
                  <Link
                    href="https://api.ipify.org?format=json"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-4 py-3 border-2 border-neutral-900 dark:border-accent-green bg-white dark:bg-[#0d0d0d] text-neutral-900 dark:text-accent-green font-bold tracking-wide rounded hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform text-center"
                  >
                    View raw JSON
                  </Link>
                </div>

                <div className="text-xs text-neutral-600 dark:text-[#999] leading-relaxed bg-[#f1ede3] dark:bg-[#111] border border-neutral-300 dark:border-neutral-700 rounded p-4">
                  <p>
                    Add this IP to your allowlist or share it with teammates.
                    Data is fetched from ipify.org.
                  </p>
                  <p className="mt-2">
                    Tip: Results update on refresh. Use a VPN toggle to see
                    changes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
