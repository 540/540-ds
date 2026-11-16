rule "slotHtml_lambda_27_19_ensures_key_in_slots"
  tier: pure
  effect: pure
  given:
  when: call precondition "key in slots"
  then:
  contracts:
    pre: call ensures "key in slots"
  examples: