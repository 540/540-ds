rule "index_renderTalk_inherits_index_renderPage_540_ds_renderer_an_island_was_left_unplaced"
  tier: pure
  effect: pure
  given:
  when: call renderPage_would_throw "540-ds renderer: an island was left unplaced"
  then:
    throw "540-ds renderer: an island was left unplaced"
  examples:
    example "caller hits index.renderPage guard":
      inputs:
      expected: error "540-ds renderer: an island was left unplaced"