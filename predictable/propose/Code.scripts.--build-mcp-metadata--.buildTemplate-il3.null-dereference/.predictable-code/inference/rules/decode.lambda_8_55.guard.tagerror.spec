rule "decode_lambda_8_55_guard_tagerror"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "TagError"
  examples:
    example "guard trips":
      inputs:
      expected: error "TagError"