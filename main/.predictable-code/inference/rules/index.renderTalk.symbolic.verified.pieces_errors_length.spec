rule "index_renderTalk_ensures_pieces_errors_length"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(pieces) || !(errors.length)"
  then:
  contracts:
    pre: call ensures "!(pieces) || !(errors.length)"
  examples: