rule "«build-pieces»_writeManifest_inherits_«build-pieces»_tagsOf_error"
  tier: pure
  effect: pure
  given:
  when: call tagsOf_would_throw "Error"
  then:
    throw "Error"
  examples:
    example "caller hits «build-pieces».tagsOf guard":
      inputs:
      expected: error "Error"