rule "carousel_Carousel_ensures_track_must_not_be_null_where_this_function_reads_through_it"
  tier: pure
  effect: pure
  given:
  when: call precondition "`track` must not be null where this function reads through it."
  then:
  contracts:
    pre: call ensures "`track` must not be null where this function reads through it."
  examples: