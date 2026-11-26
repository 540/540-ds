rule "check-runtime___moduleInit___ensures_el_must_not_be_null_where_this_module_s_top_level_code_reads_through_it"
  tier: pure
  effect: pure
  given:
  when: call precondition "`el` must not be null where this module's top-level code reads through it."
  then:
  contracts:
    pre: call ensures "`el` must not be null where this module's top-level code reads through it."
  examples: