rule "node-adapter_toWebRequest_requires_the_size_must_not_be_negative"
  tier: pure
  effect: pure
  given:
  when: call precondition "The size must not be negative."
  then:
    throw "The size must not be negative."
  contracts:
    pre: call requires "The size must not be negative."
  examples: