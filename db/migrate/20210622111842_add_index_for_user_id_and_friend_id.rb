# frozen_string_literal: true

class AddIndexForUserIdAndFriendId < ActiveRecord::Migration[6.0]
  def up
    remove_index :invitations, :user_id
    add_index :invitations, %i[user_id friend_id], unique: true
  end

  def down
    remove_index :invitations, %i[user_id friend_id]
    add_index :invitations, :user_id
  end
end
