rule "«build-pieces»_findComponents_guard_islands_with_no_component"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "Islands with no component:"
  examples:
    example "guard trips":
      inputs:
      expected: error "Islands with no component:"