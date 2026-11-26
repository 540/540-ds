rule "core_extractTalk_guard_error"
  tier: pure
  effect: pure
  given:
  when: blocks.length > 1
  then:
    throw "Error"
  examples:
    example "guard trips":
      inputs:
      expected: error "Error"