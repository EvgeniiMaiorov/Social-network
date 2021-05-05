class RemoveInterestIdColumnFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :interest_id, :integer
  end
end
