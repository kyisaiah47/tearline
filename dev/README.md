# dev

Harnesses. Nothing here is served — Next only publishes `public/`.

## og-card.html — the OG card's background art

The share card's background is the **real `<tear-line>` element**, rendered over
the product's dithered backdrop. It is not a mockup and not a screenshot of the
landing page, so it cannot drift from the component.

Rendering it needs the dev server's origin: the page loads `/tearline.js` as a
module, and a `file://` page cannot fetch a module from `http://localhost` — the
element silently fails to upgrade and you get unstyled HTML on a photo, which
looks enough like a receipt at a glance to ship by mistake.

    npm run dev
    cp dev/og-card.html public/_og.html
    node -e "import('playwright').then(async({chromium})=>{
      const b=await chromium.launch();
      const p=await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:2});
      await p.goto('http://localhost:3000/_og.html',{waitUntil:'networkidle'});
      await p.waitForTimeout(2000);
      await p.screenshot({path:process.env.HOME+'/Projects/demos/social/tools/og/bg/tearline.png',
                          clip:{x:0,y:0,width:1200,height:630}});
      await b.close();})"
    rm public/_og.html
    cd ~/Projects/demos/social/tools/og && node render.mjs render tearline

Check the element actually upgraded before trusting the output:
`customElements.get('tear-line')` and a non-null `shadowRoot`.

## export-test.html, product-shot.html

Open directly. `export-test.html` renders the PNG export back into an `<img>`,
which is the only way the foreignObject serialisation bug was ever visible —
the export failed silently and the receipt still looked fine on the page.
