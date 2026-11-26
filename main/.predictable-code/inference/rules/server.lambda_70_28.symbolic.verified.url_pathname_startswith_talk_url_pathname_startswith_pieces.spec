rule "server_lambda_70_28_ensures_url_pathname_startswith_talk_url_pathname_startswith_pieces"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(!(url.pathname.startsWith(\"/talk/\")) && !(url.pathname.startsWith(\"/pieces/\")))"
  then:
  contracts:
    pre: call ensures "!(!(url.pathname.startsWith(\"/talk/\")) && !(url.pathname.startsWith(\"/pieces/\")))"
  examples: