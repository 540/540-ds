rule "buildImages_lambda_743_20_guard_src_images_catalog_json_no_photo_for"
  tier: pure
  effect: pure
  given:
  when: true
  then:
    throw "src/images/catalog.json: no photo for"
  examples:
    example "guard trips":
      inputs:
      expected: error "src/images/catalog.json: no photo for"