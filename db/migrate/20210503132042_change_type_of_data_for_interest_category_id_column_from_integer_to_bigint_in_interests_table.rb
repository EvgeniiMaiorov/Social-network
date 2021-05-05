class ChangeTypeOfDataForInterestCategoryIdColumnFromIntegerToBigintInInterestsTable < ActiveRecord::Migration[6.0]
  def up
    change_column :interests, :interest_category_id, :bigint, null: false
    add_foreign_key :interests, :interest_categories
  end

  def down
    change_column :interests, :interest_category_id, :integer, null: true
    remove_foreign_key :interests, :interest_categories
  end
end
