rule "parse_parse_guard_tagerror"
  tier: pure
  effect: pure
  given:
  when: stack.length > 1
  then:
    throw "TagError"
  examples:
    example "guard trips":
      inputs:
      expected: error "TagError"