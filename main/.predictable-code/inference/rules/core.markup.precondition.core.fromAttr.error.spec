rule "core_markup_inherits_core_fromAttr_error"
  tier: pure
  effect: pure
  given:
  when: call fromAttr_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.fromAttr guard":
      inputs:
      expected: error "Error"