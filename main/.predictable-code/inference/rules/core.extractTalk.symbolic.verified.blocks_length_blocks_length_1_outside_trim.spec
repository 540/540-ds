rule "core_extractTalk_ensures_blocks_length_blocks_length_1_outside_trim"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(blocks.length) || blocks.length > 1 || !(outside.trim())"
  then:
  contracts:
    pre: call ensures "!(blocks.length) || blocks.length > 1 || !(outside.trim())"
  examples: