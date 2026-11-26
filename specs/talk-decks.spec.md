---
predictable: spec
---
# Talk decks

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":[],"created":"","guidelines":[],"id":"SPEC-263","lastModified":"","lastVerified":"","proseDigest":"89133354f2041b41","relatedSpecs":[]} -->
540 builds its talks (presentations) with this design system. A talk is a Deck: the root frame that holds the blobs in the background, a top bar with the menu and the theme toggle, the talk's stops (Slide components), a side index and the DeckFooter as the last stop. Inside it the talk is assembled only from catalog pieces such as Cover, BlockTitle, Statements, Story, Quote, Punchline, Timeline, Steps, Spotlight and Closing, following the talk rules in src/docs/normas-charlas.md. TalkTemplate is a complete example talk with every possible stop, used as the reference to copy from.

The Deck walks the audience through the talk from the keyboard: next and previous with the arrow keys, Page Up/Down and Space, first and last stop with Home and End. A stop taller than the window is scrolled through first, a block title with its photo is one stop, and elements marked as stops inside a Slide (theses, timeline steps, spotlight phrases) become the stops instead of the Slide. The keyboard does nothing while the speaker types in a field or a dialog is open, and with reduced motion the jump is instant.

The side index shows one mark per stop, with the current one marked for assistive technology, and never draws more than twenty marks: longer talks are split into twenty even sections. The top bar hides while navigating and comes back when the pointer reaches the top area. Talks are dark by default; the chosen theme is remembered in localStorage under the key 540:tema and applied on the Deck's own root, without reading the system preference.

Everything must render without a browser, because talks are pre-rendered to static HTML: browser APIs are touched only in effects and event handlers.

## Behaviour

- The Deck moves to the next stop with the right and down arrows, Page Down and Space, and to the previous one with the left and up arrows, Page Up and Shift+Space.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Home goes to the first stop and End to the last stop.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The Deck ignores navigation keys while the user types in a field or a dialog is open.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The side index never draws more than twenty marks; longer talks are split into twenty even sections.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0004","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The current mark of the side index carries aria-current.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0005","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The Deck is dark by default and remembers the chosen theme in localStorage under the key 540:tema.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0006","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The DeckFooter is always the last stop.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0007","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
