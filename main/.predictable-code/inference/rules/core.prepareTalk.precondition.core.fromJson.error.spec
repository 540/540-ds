rule "core_prepareTalk_inherits_core_fromJson_error"
  tier: pure
  effect: pure
  given:
  when: call fromJson_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.fromJson guard":
      inputs:
      expected: error "Error"