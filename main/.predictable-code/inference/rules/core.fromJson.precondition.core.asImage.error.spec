rule "core_fromJson_inherits_core_asImage_error"
  tier: pure
  effect: pure
  given:
  when: call asImage_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.asImage guard":
      inputs:
      expected: error "Error"