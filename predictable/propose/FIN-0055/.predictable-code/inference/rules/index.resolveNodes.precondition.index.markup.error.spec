rule "index_resolveNodes_inherits_index_markup_error"
  tier: pure
  effect: pure
  given:
  when: call markup_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits index.markup guard":
      inputs:
      expected: error "Error"