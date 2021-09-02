# frozen_string_literal: true

class CreateConversationUser < ActiveRecord::Migration[6.0]
  def change
    create_join_table :conversations, :users do |t|
      t.index :conversation_id
      t.index :user_id
      t.index %i[conversation_id user_id], unique: true
    end
  end
end
