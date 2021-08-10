# frozen_string_literal: true

class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.string :activity_type, null: false
      t.references :user, null: false
      t.references :activeble, polymorphic: true

      t.timestamps
    end
  end
end
