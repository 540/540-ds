rule "core_extractTalk_ensures_blocks_length_blocks_length_1"
  tier: pure
  effect: pure
  given:
  when: call precondition "!(blocks.length) || blocks.length <= 1"
  then:
  contracts:
    pre: call ensures "!(blocks.length) || blocks.length <= 1"
  examples: