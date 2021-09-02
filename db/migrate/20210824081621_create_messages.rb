# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :conversation, null: false
      t.references :user, null: false

      t.timestamps
    end
  end
end
