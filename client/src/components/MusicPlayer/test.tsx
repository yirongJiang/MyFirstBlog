import React, { useEffect, useRef } from "react";

export function Test() {
  const ref = useRef<HTMLAudioElement | null>(null)


  return <audio ref={ref}></audio >
}