class AddOnlineAtColumnForUsersTable < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :online_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
