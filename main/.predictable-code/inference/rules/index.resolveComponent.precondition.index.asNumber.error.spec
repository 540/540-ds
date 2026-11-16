rule "index_resolveComponent_inherits_index_asNumber_error"
  tier: pure
  effect: pure
  given:
  when: call asNumber_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits index.asNumber guard":
      inputs:
      expected: error "Error"