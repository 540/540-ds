rule "buildImages_lambda_743_20_ensures_fs_existssync_path_join_root_src_images_photos_string_image_id_webp"
  tier: pure
  effect: pure
  given:
  when: call precondition "fs.existsSync(path.join(root, \"src/images/photos\", \"\" + String(image.id) + \".webp\"))"
  then:
  contracts:
    pre: call ensures "fs.existsSync(path.join(root, \"src/images/photos\", \"\" + String(image.id) + \".webp\"))"
  examples: