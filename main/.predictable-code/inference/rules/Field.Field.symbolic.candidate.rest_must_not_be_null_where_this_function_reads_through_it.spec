rule "field_Field_requires_rest_must_not_be_null_where_this_function_reads_through_it"
  tier: pure
  effect: pure
  given:
  when: call precondition "`rest` must not be null where this function reads through it."
  then:
    throw "`rest` must not be null where this function reads through it."
  contracts:
    pre: call requires "`rest` must not be null where this function reads through it."
  examples: