"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface EnvInfo {
  urlPresent: boolean;
  keyPresent: boolean;
  urlValue?: string;
  keyLength?: number;
  keyPrefix?: string;
}

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking...");
  const [envInfo, setEnvInfo] = useState<EnvInfo>({
    urlPresent: false,
    keyPresent: false,
  });

  useEffect(() => {
    async function check() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        const info: EnvInfo = {
          urlPresent: !!url,
          keyPresent: !!key,
          urlValue: url,
          keyLength: key?.length,
          keyPrefix: key?.substring(0, 10),
        };
        setEnvInfo(info);

        if (!supabase) {
          setStatus(
            "⚠️ SKIPPED: Supabase not configured. Check your environment variables."
          );
          return;
        }

        const { error } = await supabase
          .from("projects")
          .select("id", { count: "exact", head: true });

        if (error) {
          console.error("Supabase Error Full:", error);
          setStatus(`❌ CONNECTION FAILED: ${error.message}`);
        } else {
          setStatus("✅ CONNECTION SUCCESS! Database is connected.");
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
        console.error("Catch Error:", e);
        setStatus(`⚠️ CRITICAL ERROR: ${errorMessage}`);
      }
    }

    check();
  }, []);

  return (
    <div className="p-10 bg-black text-white font-mono">
      <h1 className="text-2xl font-bold mb-4">Supabase Diagnostics</h1>
      <div className="border border-white/20 p-4 rounded mb-4">
        <h2 className="text-xl mb-2">Environment Variables</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>
      <div className="border border-red-500/50 p-4 rounded">
        <h2 className="text-xl mb-2">Connection Status</h2>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}
