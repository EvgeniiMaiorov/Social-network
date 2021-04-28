class AddInterestIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :interest_id, :integer
  end
end
