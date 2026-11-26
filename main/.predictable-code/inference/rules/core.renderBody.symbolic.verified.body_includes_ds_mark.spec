rule "core_renderBody_ensures_body_includes_ds_mark"
  tier: pure
  effect: pure
  given:
  when: call precondition "body.includes(\">=ds-mark\")"
  then:
  contracts:
    pre: call ensures "body.includes(\">=ds-mark\")"
  examples: