rule "decode_lambda_8_55_ensures_ref_0_ref_in_entities"
  tier: pure
  effect: pure
  given:
  when: call precondition "ref[0] == \"#\" || ref in ENTITIES"
  then:
  contracts:
    pre: call ensures "ref[0] == \"#\" || ref in ENTITIES"
  examples: