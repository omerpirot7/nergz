"use client";

import { useEffect } from "react";
import { useApp } from "@/context/app-context";

export function DocumentMeta() {
  const { t } = useApp();

  useEffect(() => {
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);
  }, [t]);

  return null;
}
