"use client";

import Image from "next/image";
import s from "./cip-footer.module.scss";

export const CipFooter = () => {
  return (
    <>
      {/* CIP Challenge Section */}
      <section className={s["cip-section"]}>
        <div className={s["cip-content"]}>
          <a
            href="https://www.cip.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={s["cip-logo-link"]}
          >
            <Image
              src="/images/cip/cip-logo-white.png"
              alt="Collective Intelligence Project Logo"
              width={200}
              height={55}
              className={s["cip-logo"]}
              style={{
                width: 'auto',
                height: 'auto',
              }}
            />
          </a>
          <p className={s["cip-description"]}>
            This scrollytelling experience is an entry for the{" "}
            <a
              href="https://www.cip.org/challenge"
              target="_blank"
              rel="noopener noreferrer"
              className={s["cip-link"]}
            >
              Global Dialogues Challenge
            </a>{" "}
            by the Collective Intelligence Project.
          </p>
          <p className={s["cip-contributors"]}>
            <strong>Contributors:</strong> <br />Simon Wisdom, Bridget Harris, and Christopher Ackerman.
          </p>
          <p className={s["cip-date"]}>July 2025</p>
        </div>
      </section>

      {/* Main Footer */}
      <footer className={s["footer"]}>
        <div className={s["footer-content"]}>
          <div className={s["footer-main"]}>
            <h3 className={s["footer-title"]}>Are you there?</h3>
          </div>
          
          <div className={s["footer-disclosure"]}>
            <p className={s["ai-disclosure"]}>
              <strong>AI-use disclosure:</strong> AI was used to generate parts of this website, including images and animations, and assisted in the data analysis. The vignettes were entirely written by humans.
            </p>
          </div>
          
          <div className={s["footer-meta"]}>
            <p className={s["footer-description"]}>
              Consciousness and connection in the age of AI
            </p>
            
            <p className={s["template-credit"]}>
              Scrollytelling template adapted from{" "}
              <a 
                href="https://github.com/basementstudio/scrollytelling" 
                target="_blank" 
                rel="noopener noreferrer"
                className={s["template-link"]}
              >
                basement studio scrollytelling
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};