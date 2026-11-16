rule "index_renderTalk_ensures_pieces"
  tier: pure
  effect: pure
  given:
  when: call precondition "pieces"
  then:
  contracts:
    pre: call ensures "pieces"
  examples: