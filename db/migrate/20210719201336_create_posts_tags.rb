# frozen_string_literal: true

class CreatePostsTags < ActiveRecord::Migration[6.0]
  def create
    create_table :posts_tags, id: false do |t|
      t.references :post, null: false, index: false
      t.references :tag, null: false
    end

    add_index :posts_tags, %i[post_id tag_id], unique: true
  end
end
