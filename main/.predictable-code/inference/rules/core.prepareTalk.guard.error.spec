rule "core_prepareTalk_guard_error"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "Error"
  examples:
    example "guard trips":
      inputs:
      expected: error "Error"