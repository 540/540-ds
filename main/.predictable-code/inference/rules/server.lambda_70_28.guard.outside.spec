rule "server_lambda_70_28_guard_outside"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "outside"
  examples:
    example "guard trips":
      inputs:
      expected: error "outside"