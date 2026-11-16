rule "server_renderIsland_ensures_type_is_present"
  tier: pure
  effect: pure
  given:
  when: call precondition "type is present"
  then:
  contracts:
    pre: call ensures "type is present"
  examples: