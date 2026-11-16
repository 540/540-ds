rule "index_resolveElement_inherits_index_fromJson_error"
  tier: pure
  effect: pure
  given:
  when: call fromJson_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits index.fromJson guard":
      inputs:
      expected: error "Error"