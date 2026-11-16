rule "«build-pieces»_components_inherits_«build-pieces»_findComponents_islands_with_no_component"
  tier: pure
  effect: pure
  given:
  when: call findComponents_would_throw "Islands with no component:"
  then:
    throw "Islands with no component:"
  examples:
    example "caller hits «build-pieces».findComponents guard":
      inputs:
      expected: error "Islands with no component:"