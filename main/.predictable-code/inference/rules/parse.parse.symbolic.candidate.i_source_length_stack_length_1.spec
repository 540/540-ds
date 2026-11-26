rule "parse_parse_requires_i_source_length_stack_length_1"
  tier: pure
  effect: pure
  given:
  when: call precondition "i < source.length || stack.length <= 1"
  then:
    throw "i < source.length || stack.length <= 1"
  contracts:
    pre: call requires "i < source.length || stack.length <= 1"
  examples: