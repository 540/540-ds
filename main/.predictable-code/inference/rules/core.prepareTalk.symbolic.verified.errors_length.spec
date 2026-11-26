rule "core_prepareTalk_ensures_errors_length"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(errors.length)"
  then:
  contracts:
    pre: call ensures "!(errors.length)"
  examples: