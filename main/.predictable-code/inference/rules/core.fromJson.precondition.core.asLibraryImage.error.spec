rule "core_fromJson_inherits_core_asLibraryImage_error"
  tier: pure
  effect: pure
  given:
  when: call asLibraryImage_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits core.asLibraryImage guard":
      inputs:
      expected: error "Error"