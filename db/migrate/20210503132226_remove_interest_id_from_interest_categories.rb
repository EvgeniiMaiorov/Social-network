class RemoveInterestIdFromInterestCategories < ActiveRecord::Migration[6.0]
  def change
    remove_column :interest_categories, :interest_id, :integer
  end
end
