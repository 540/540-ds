rule "index_fromAttr_guard_error"
  tier: pure
  effect: pure
  given:
  when: raw == null
  then:
    throw "Error"
  examples:
    example "guard trips":
      inputs:
      expected: error "Error"