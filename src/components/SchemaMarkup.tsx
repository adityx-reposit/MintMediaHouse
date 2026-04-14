"use client";

import { useEffect } from "react";
import { schemaMarkup } from "@/lib/schema";

export default function SchemaMarkup() {
  useEffect(() => {
    // Inject schema markup if not already present
    if (typeof document !== "undefined") {
      const existingScript = document.getElementById("schema-markup");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "schema-markup";
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(schemaMarkup);
        document.head.appendChild(script);
      }
    }
  }, []);

  return null;
}
