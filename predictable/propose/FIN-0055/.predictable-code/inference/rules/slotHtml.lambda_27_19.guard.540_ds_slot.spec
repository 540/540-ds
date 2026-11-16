rule "slotHtml_lambda_27_19_guard_540_ds_slot"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "540-ds: slot \""
  examples:
    example "guard trips":
      inputs:
      expected: error "540-ds: slot \""