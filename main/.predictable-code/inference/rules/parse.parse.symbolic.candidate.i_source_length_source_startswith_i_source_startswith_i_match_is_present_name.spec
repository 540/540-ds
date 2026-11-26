rule "parse_parse_requires_i_source_length_source_startswith_i_source_startswith_i_match_is_present_name"
  tier: pure
  effect: pure
  given:
  when: call precondition "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\">=/\", i) || !(match is present) || … == name"
  then:
    throw "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\">=/\", i) || !(match is present) || … == name"
  contracts:
    pre: call requires "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\">=/\", i) || !(match is present) || … == name"
  examples: