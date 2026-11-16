rule "index_checkOffline_guard_the_page_would_need_files_from_outside"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "the page would need files from outside:"
  examples:
    example "guard trips":
      inputs:
      expected: error "the page would need files from outside:"