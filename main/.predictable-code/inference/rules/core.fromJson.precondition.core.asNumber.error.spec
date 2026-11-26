rule "core_fromJson_inherits_core_asNumber_error"
  tier: pure
  effect: pure
  given:
  when: call asNumber_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.asNumber guard":
      inputs:
      expected: error "Error"