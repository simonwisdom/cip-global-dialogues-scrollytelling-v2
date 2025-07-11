"use client";

import { useState } from "react";
import { Root, Animation } from "~/lib/scrollytelling-client";

const texts = ["one", "two", "three"];

export default function Page() {
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(undefined);

  return (
    <main>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <button onClick={() => setIsDisabled((p) => false)}>
          Toggle Disabled
        </button>
        <p>Disabled: {JSON.stringify(isDisabled)}</p>
      </div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "blue",
        }}
      />
      {texts.map((text, i) => {
        return (
          <Root
            disabled={isDisabled}
            key={i}
          >
            <div style={{ height: "200vh", background: "black" }}>
              <div style={{ position: "sticky", top: 0 }}>
                <Animation
                  tween={{
                    start: 0,
                    end: 100,
                    to: { scale: 1.5 },
                  }}
                  disabled={isDisabled}
                >
                  <h1
                    style={{
                      fontSize: "5rem",
                      transformOrigin: "top left",
                    }}
                  >
                    {text}
                  </h1>
                </Animation>
              </div>
            </div>
          </Root>
        );
      })}
      <div style={{ height: "100vh", backgroundColor: "red" }} />
    </main>
  );
}
