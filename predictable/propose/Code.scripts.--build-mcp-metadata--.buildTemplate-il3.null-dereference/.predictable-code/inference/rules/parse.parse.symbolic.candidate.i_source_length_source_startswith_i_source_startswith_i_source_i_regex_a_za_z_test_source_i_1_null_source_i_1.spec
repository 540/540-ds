rule "parse_parse_requires_i_source_length_source_startswith_i_source_startswith_i_source_i_regex_a_za_z_test_source_i_1_null_source_i_1"
  tier: pure
  effect: pure
  given:
  when: call precondition "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\"</\", i) || (source[i] == \"<\" && regex(\"/[a-zA-Z!]/\").test((source[i + 1] != null ? source[i + 1] : \"\")))"
  then:
    throw "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\"</\", i) || (source[i] == \"<\" && regex(\"/[a-zA-Z!]/\").test((source[i + 1] != null ? source[i + 1] : \"\")))"
  contracts:
    pre: call requires "i >= source.length || source.startsWith(\"<!--\", i) || source.startsWith(\"</\", i) || (source[i] == \"<\" && regex(\"/[a-zA-Z!]/\").test((source[i + 1] != null ? source[i + 1] : \"\")))"
  examples: