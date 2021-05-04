class ChangeTypeOfDataForInterestIdAndUserIdColumnsFromIntegerToBigintInUserInterestsTable < ActiveRecord::Migration[6.0]
  def up
    change_column :user_interests, :interest_id, :bigint, null: false
    add_foreign_key :user_interests, :interests
    change_column :user_interests, :user_id, :bigint, null: false
    add_foreign_key :user_interests, :users
  end

  def down
    change_column :user_interests, :interest_id, :integer, null: true
    remove_foreign_key :user_interests, :interests
    change_column :user_interests, :user_id, :integer, null: true
    remove_foreign_key :user_interests, :users
  end
end
