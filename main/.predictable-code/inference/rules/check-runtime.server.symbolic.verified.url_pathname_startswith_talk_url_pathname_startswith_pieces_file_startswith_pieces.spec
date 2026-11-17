rule "check-runtime_server_ensures_url_pathname_startswith_talk_url_pathname_startswith_pieces_file_startswith_pieces"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(!(url.pathname.startsWith(\"/talk/\")) && !(!(url.pathname.startsWith(\"/pieces/\"))) && !(file.startsWith(pieces)))"
  then:
  contracts:
    pre: call ensures "!(!(url.pathname.startsWith(\"/talk/\")) && !(!(url.pathname.startsWith(\"/pieces/\"))) && !(file.startsWith(pieces)))"
  examples: