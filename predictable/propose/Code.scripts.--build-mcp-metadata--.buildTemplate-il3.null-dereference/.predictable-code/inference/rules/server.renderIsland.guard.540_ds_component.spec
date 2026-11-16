rule "server_renderIsland_guard_540_ds_component"
  tier: pure
  effect: pure
  given:
  when: type == null
  then:
    throw "540-ds: component \""
  examples:
    example "guard trips":
      inputs:
      expected: error "540-ds: component \""