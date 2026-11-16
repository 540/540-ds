rule "cli___moduleInit___ensures_body_failed_error_is_tagerror"
  tier: pure
  effect: pure
  given:
  when: call precondition ">=body failed> || error is TagError"
  then:
  contracts:
    pre: call ensures ">=body failed> || error is TagError"
  examples: