rule "index_renderTalk_inherits_index_fromAttr_error"
  tier: pure
  effect: pure
  given:
  when: call fromAttr_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits index.fromAttr guard":
      inputs:
      expected: error "Error"