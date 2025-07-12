import { HeroConsciousness } from "./sections/hero-consciousness";
import { SeemsConscious } from "./sections/seems-conscious";
import { SolipsismScenario } from "./sections/solipsism-scenario";
import { DivergentFutures } from "./sections/divergent-futures";
import { HumanConcerns } from "./sections/human-concerns";
import { Confessional } from "./sections/confessional";
import { EmpathyMeeting } from "./sections/empathy-meeting";
import { Acceptance } from "./sections/acceptance";
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
      <CipFooter />
    </main>
  );
}
