import LandingPage from "@compound/landing/pieces/landing/LandingPage";
import { IndexCard, IndexCards } from "@compound/landing/_route/DocList";
import TearlineWorkflow from "@/components/TearlineWorkflow";
import Playground from "@/components/Playground";
import { GUIDE_INDEX } from "@/lib/guide-index";

/* THE FRONT DOOR, on the register's one landing. The hero carries this product's own render, the
 * diagram is the markup-to-PNG path read off tearline.js and the export stages, and the slot
 * under it carries the playground driving the real element, then links the docs and every guide.
 * The FAQPage node is emitted by the register from the same list the answers are read from. */
export default function Home() {
  return (
    <LandingPage
      heroArtSrc={"/images/tearline-hero-v1.png"}
      workflow={<TearlineWorkflow compact showIcons />}
      feed={
        <>
          <div className={"frame-prose"}>
            <Playground />
          </div>
          <IndexCards>
            {GUIDE_INDEX.map((g) => (
              <IndexCard key={g.href} href={g.href} tag={g.tag} title={g.title} summary={g.desc} headingLevel={3} />
            ))}
          </IndexCards>
        </>
      }
      feedLabel={"Try it, then the docs and the guides"}
    />
  );
}
