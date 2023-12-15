"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

type PreviewProps = {
  value: string;
};

export const Preview = ({ value }: PreviewProps) => {
  // Even when using 'use client' it renders in ther server once so we import react-quill like this
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
      <ReactQuill theme="bubble" value={value} readOnly />
  );
};
