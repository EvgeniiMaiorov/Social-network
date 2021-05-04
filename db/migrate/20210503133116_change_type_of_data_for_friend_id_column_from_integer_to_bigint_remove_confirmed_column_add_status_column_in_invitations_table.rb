class ChangeTypeOfDataForFriendIdColumnFromIntegerToBigintRemoveConfirmedColumnAddStatusColumnInInvitationsTable < ActiveRecord::Migration[6.0]
  def up
    remove_column :invitations, :confirmed
    change_column :invitations, :friend_id, :bigint, null: false
    add_foreign_key :invitations, :users, column: :friend_id
    add_column :invitations, :status, :string, default: 'pending', null: false
  end

  def down
    remove_column :invitations, :status
    change_column :invitations, :friend_id, :integer, null: true
    remove_foreign_key :invitations, column: :friend_id
    add_column :invitations, :confirmed, :boolean, default: false
  end
end
