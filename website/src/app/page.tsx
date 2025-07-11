import { HeroConsciousness } from "./sections/hero-consciousness";
import { SolipsismScenario } from "./sections/solipsism-scenario";
import { DivergentFutures } from "./sections/divergent-futures";
import { Confessional } from "./sections/confessional";
import { PerformativeConsciousness } from "./sections/performative-consciousness";
import { EmpathyOlympics } from "./sections/empathy-olympics";
import { NeoRomanticism } from "./sections/neo-romanticism";
import { ConsciousnessTest } from "./sections/consciousness-test";
import { CipFooter } from "./sections/cip-footer";

export default function HomePage() {
  return (
    <main>
      <HeroConsciousness />
      <SolipsismScenario />
      <DivergentFutures />
      <Confessional />
      {/* <PerformativeConsciousness />
      <EmpathyOlympics />
      <NeoRomanticism />
      <ConsciousnessTest /> */}
      <CipFooter />
    </main>
  );
}
