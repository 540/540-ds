rule "check-islands___moduleInit___requires_i_2_states_join_false_true_false"
  tier: pure
  effect: pure
  given:
  when: call precondition "i < 2 || states.join() != \"false,true,false\""
  then:
    throw "i < 2 || states.join() != \"false,true,false\""
  contracts:
    pre: call requires "i < 2 || states.join() != \"false,true,false\""
  examples: