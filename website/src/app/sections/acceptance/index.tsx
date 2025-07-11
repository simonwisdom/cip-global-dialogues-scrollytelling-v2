"use client";

import s from "./acceptance.module.scss";

export const Acceptance = () => {
  return (
    <section className={s.acceptance}>
      <h2 className={s.title}>Acceptance</h2>
      <p className={s.subtitle}>
        Exploring public sentiment on the societal impact of artificial
        intelligence.
      </p>
      <div className={s["intro-text"]}>
        <p>
          While there was some ambiguity in the data around empathy, the
          responses around the acceptability of human-AI relationships were
          much more clear-cut:
        </p>
      </div>
      <div className={s["chart-grid"]}>
        <div className={s["chart-placeholder"]}>
          <h3 className={s["chart-title"]}>
            Non-Acceptability of Human-AI Relationships
          </h3>
          <p className={s["supporting-text"]}>
            [graphs here on non acceptability]
          </p>
        </div>
        <div className={s["chart-placeholder"]}>
          <h3 className={s["chart-title"]}>
            AI Spiritual Advisor vs. AI Relationship
          </h3>
          <p className={s["supporting-text"]}>
            [graph here on approval of spiritual advisor vs AI relationship]
          </p>
        </div>
      </div>
      <div className={s["conclusion-text"]}>
        <p>
          People were much more likely to accept an AI spiritual advisor vs an
          AI relationship:
        </p>
        <p>
          Yet media reports show that people are forming relationships with
          AIs. What might that be like for them, amid apparent societal
          disapproval?
        </p>
      </div>
    </section>
  );
}; 