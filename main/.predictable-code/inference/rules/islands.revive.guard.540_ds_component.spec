rule "islands_revive_guard_540_ds_component"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "540-ds: component \""
  examples:
    example "guard trips":
      inputs:
      expected: error "540-ds: component \""