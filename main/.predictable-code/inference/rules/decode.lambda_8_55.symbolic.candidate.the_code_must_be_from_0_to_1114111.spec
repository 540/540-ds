rule "decode_lambda_8_55_requires_the_code_must_be_from_0_to_1114111"
  tier: pure
  effect: pure
  given:
  when: call precondition "The code must be from 0 to 1114111."
  then:
    throw "The code must be from 0 to 1114111."
  contracts:
    pre: call requires "The code must be from 0 to 1114111."
  examples: