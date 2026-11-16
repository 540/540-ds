rule "tag-contract_readContract_ensures_modulesymbol"
  tier: pure
  effect: pure
  given:
  when: call precondition "moduleSymbol"
  then:
  contracts:
    pre: call ensures "moduleSymbol"
  examples: