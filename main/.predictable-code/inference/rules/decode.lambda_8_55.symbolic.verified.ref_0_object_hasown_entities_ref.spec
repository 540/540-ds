rule "decode_lambda_8_55_ensures_ref_0_object_hasown_entities_ref"
  tier: pure
  effect: pure
  given:
  when: call precondition "ref[0] == \"#\" || Object.hasOwn(ENTITIES, ref)"
  then:
  contracts:
    pre: call ensures "ref[0] == \"#\" || Object.hasOwn(ENTITIES, ref)"
  examples: