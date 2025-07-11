"use client";

import s from "./human-concerns.module.scss";

const charts = [
  {
    title: "Chart 1: AI vs Human Job Displacement",
    text: "This chart will illustrate public opinion on job displacement caused by AI compared to other historical technological shifts.",
  },
  {
    title: "Chart 2: Trust in AI Decision-Making",
    text: "This chart will show varying levels of trust in AI for critical sectors like healthcare, finance, and justice.",
  },
  {
    title: "Chart 3: Ethical Concerns in AI Development",
    text: "This chart will highlight top ethical concerns, such as bias, privacy, and accountability, as perceived by the public.",
  },
  {
    title: "Chart 4: Perceived Impact on Social Connection",
    text: "This chart will visualize whether people believe AI will lead to more social isolation or new forms of connection.",
  },
];

export const HumanConcerns = () => {
  return (
    <section className={s['human-concerns']}>
      <h2 className={s.title}>Human Concerns</h2>
      <p className={s.subtitle}>
        Exploring public sentiment on the societal impact of artificial intelligence.
      </p>
      <div className={s['intro-text']}>
        <p>Are we choosing where we want AI just based on where we value humanity? Or maybe consciousness?</p>
        <p>People seem to care about consciousness as it relates to empathy and connection. </p>
        <p>In fact - without a human sense of ‘care’ or ‘understanding’ - people reported being reluctant to use an AI for emotional support over the long term. Even if it had helped them feel better beforehand. </p>
      </div>
      <div className={s['chart-grid']}>
        {charts.map((chart, index) => (
          <div key={index} className={s['chart-placeholder']}>
            <h3 className={s['chart-title']}>{chart.title}</h3>
            <p className={s['supporting-text']}>{chart.text}</p>
          </div>
        ))}
      </div>
      <div className={s['conclusion-text']}>
        <p>It’s hard to know what conclusion to draw from this data, beyond a sense that people care about empathy, worry about AI in emotional roles (and yet use it for emotional support) and believe that empathy is deeply human. </p>
        <p>What’s a middle way between these responses? Might human empathy become a prized asset? one of the only remaining ways for humans to compete? And might that be so bad for human connection, after all? </p>
      </div>
    </section>
  );
}; 