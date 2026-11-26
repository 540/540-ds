rule "server_lambda_70_28_guard_not_found"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "not found"
  examples:
    example "guard trips":
      inputs:
      expected: error "not found"