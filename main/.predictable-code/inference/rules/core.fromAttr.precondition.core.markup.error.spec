rule "core_fromAttr_inherits_core_markup_error"
  tier: pure
  effect: pure
  given:
  when: call markup_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.markup guard":
      inputs:
      expected: error "Error"