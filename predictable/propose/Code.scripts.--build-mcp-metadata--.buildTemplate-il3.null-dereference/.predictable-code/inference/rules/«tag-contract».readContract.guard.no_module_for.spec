rule "«tag-contract»_readContract_guard_no_module_for"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "No module for"
  examples:
    example "guard trips":
      inputs:
      expected: error "No module for"