import { HeroConsciousness } from "./sections/hero-consciousness";
import { SeemsConscious } from "./sections/seems-conscious";
import { SolipsismScenario } from "./sections/solipsism-scenario";
import { DivergentFutures } from "./sections/divergent-futures";
import { HumanConcerns } from "./sections/human-concerns";
import { Confessional } from "./sections/confessional";
import { EmpathyMeeting } from "./sections/empathy-meeting";
import { Acceptance } from "./sections/acceptance";
import { ThinkingFeeling } from "./sections/thinking-feeling";
import { PerformativeConsciousness } from "./sections/performative-consciousness";
import { EmpathyOlympics } from "./sections/empathy-olympics";
import { NeoRomanticism } from "./sections/neo-romanticism";
import { ConsciousnessTest } from "./sections/consciousness-test";
import { CipFooter } from "./sections/cip-footer";

export default function HomePage() {
  return (
    <main>
      <HeroConsciousness />
      <SeemsConscious />
      <SolipsismScenario />
      <DivergentFutures />
      <HumanConcerns />
      <EmpathyMeeting />
      <Acceptance />
      <Confessional />
      {/* <ThinkingFeeling /> */}
      {/* <PerformativeConsciousness />
      <EmpathyOlympics />`
      <NeoRomanticism />
      <ConsciousnessTest /> */}
      <CipFooter />
    </main>
  );
}
