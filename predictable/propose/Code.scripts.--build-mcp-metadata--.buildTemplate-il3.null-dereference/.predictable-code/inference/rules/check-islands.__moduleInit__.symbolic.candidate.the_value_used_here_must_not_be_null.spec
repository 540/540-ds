rule "check-islands___moduleInit___requires_the_value_used_here_must_not_be_null"
  tier: pure
  effect: pure
  given:
  when: call precondition "The value used here must not be null."
  then:
    throw "The value used here must not be null."
  contracts:
    pre: call requires "The value used here must not be null."
  examples: