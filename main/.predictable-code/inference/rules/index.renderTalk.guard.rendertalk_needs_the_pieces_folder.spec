rule "index_renderTalk_guard_rendertalk_needs_the_pieces_folder"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "renderTalk needs the pieces folder"
  examples:
    example "guard trips":
      inputs:
      expected: error "renderTalk needs the pieces folder"