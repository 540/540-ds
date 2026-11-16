rule "index_renderPage_guard_540_ds_renderer_an_island_was_left_unplaced"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "540-ds renderer: an island was left unplaced"
  examples:
    example "guard trips":
      inputs:
      expected: error "540-ds renderer: an island was left unplaced"