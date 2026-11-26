rule "index_renderTalk_inherits_index_checkOffline_the_page_would_need_files_from_outside"
  tier: pure
  effect: pure
  given:
  when: call checkOffline_would_throw "the page would need files from outside:"
  then:
    throw "the page would need files from outside:"
  examples:
    example "caller hits index.checkOffline guard":
      inputs:
      expected: error "the page would need files from outside:"