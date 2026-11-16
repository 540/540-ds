rule "index_resolveComponent_inherits_index_asImage_error"
  tier: pure
  effect: pure
  given:
  when: call asImage_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits index.asImage guard":
      inputs:
      expected: error "Error"