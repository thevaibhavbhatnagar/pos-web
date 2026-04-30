// components/ProgressBar.tsx
"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/ui/progress.style.css"; // your custom bar style

interface ProgressBarProps {
  loading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loading }) => {
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      easing: "ease",
      speed: 500,
    });
  }, []);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return null;
};

export default ProgressBar;
