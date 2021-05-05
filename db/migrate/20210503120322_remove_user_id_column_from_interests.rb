class RemoveUserIdColumnFromInterests < ActiveRecord::Migration[6.0]
  def change
    remove_column :interests, :user_id, :integer
  end
end
