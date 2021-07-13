# frozen_string_literal: true

class AddPublisedAtColunmToPosts < ActiveRecord::Migration[6.0]
  def up
    add_column :posts, :published_at, :datetime
  end

  def down
    remove_column :posts, :published_at
  end
end
