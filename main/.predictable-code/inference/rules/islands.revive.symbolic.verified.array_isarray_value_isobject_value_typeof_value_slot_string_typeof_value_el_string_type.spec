rule "islands_revive_ensures_array_isarray_value_isobject_value_typeof_value_slot_string_typeof_value_el_string_type"
  tier: pure
  effect: pure
  given:
  when: call precondition "Array.isArray(value) || !(isObject(value)) || typeof(value.$slot) == \"string\" || typeof(value.$el) != \"string\" || type"
  then:
  contracts:
    pre: call ensures "Array.isArray(value) || !(isObject(value)) || typeof(value.$slot) == \"string\" || typeof(value.$el) != \"string\" || type"
  examples: