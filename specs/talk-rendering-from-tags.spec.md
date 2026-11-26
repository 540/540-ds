---
predictable: spec
---
# Talk rendering from tags

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":["scripts/render","src/render.setup.ts"],"created":"","guidelines":[],"id":"SPEC-267","lastModified":"","lastVerified":"","proseDigest":"f87a98905e503039","relatedSpecs":[]} -->
A talk can be written as an HTML fragment of <rev-…> tags, one tag per catalog component export (GridItem becomes rev-grid-item, storageKey becomes storage-key, children is the tag's content). The 540-ds-render command shipped in the npm package, and renderTalk behind it, turn such a document into one self-contained .html file that works offline: pre-rendered static HTML, only the CSS of base styles and of the components used, the DM Sans font and every image embedded, and JavaScript only when the talk uses an interactive component. The command can also print the tag contract, the props of given tags and the version.

The tag contract is not written by hand: build:pieces derives it from the component names and their Props types into the pieces manifest, and the MCP server reads the same contract. Attribute values follow the prop's type: plain strings, numbers, booleans by presence, enum values, phrasing HTML for nodes (only strong, em, b, i, code, small, sub, sup, br and a), JSON for arrays and objects, relative image paths and biblioteca:<id> photos from the image library. Drawing inside Schema is limited to the SVG elements and classes of its vocabulary.

The render fails with every problem at once, each with its line and column and a suggestion where it can: unknown tags, attributes or values, JSON fields that are missing or extra, missing required props, remote or missing images, unknown library photos. It also warns about talks that break the talk rules: a static wrapper cutting a piece off its steps, one stop shape used for more than 30% of the content stops or twice in a row, a big photo with a sentence under it, text beside a photo aligned to the start, a repeated library photo, and misspelled words in a Spanish talk.

For claude.ai and other places without Node, a browser runtime paints a talk written inside a <script type='text/rev'> block, loading only the components it uses from a CDN, with the same checks and byte-for-byte the same HTML as the Node render; when the talk has errors it paints nothing and shows a panel listing them.

## Behaviour

- Rendering a talk with only static components produces HTML and CSS with no script.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Rendering a talk with interactive components includes the island runtime, and every island hydrates without errors.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render fails on unknown tags, attributes and values, listing every problem with its line and column.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render rejects remote images and anything else that would not work offline.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0004","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render embeds image-library photos given as biblioteca:<id> and warns when one is repeated in the talk.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0005","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render rejects an image-library id that does not exist, with a suggestion.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0006","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render rejects drawing inside Schema outside its SVG vocabulary.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0007","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every component export has a tag in the pieces manifest.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0008","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render warns when one stop shape is used for more than 30% of the content stops, or for two stops in a row.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0009","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render warns about misspelled words in a Spanish talk, with suggestions, and does not check the spelling of a talk in another language.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0010","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- A talk written for the browser runtime renders to the same page as the plain tag document.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0011","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- A talk written for the browser runtime takes its language from data-lang unless the caller sets one.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0012","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The render rejects content outside the browser runtime block.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0013","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
