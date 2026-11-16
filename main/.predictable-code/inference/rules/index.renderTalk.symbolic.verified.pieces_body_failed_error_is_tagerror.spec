rule "index_renderTalk_ensures_pieces_body_failed_error_is_tagerror"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(pieces) || >=body failed> || !(error is TagError)"
  then:
  contracts:
    pre: call ensures "!(pieces) || >=body failed> || !(error is TagError)"
  examples: