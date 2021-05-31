class AddUniqIndexForNameToInterests < ActiveRecord::Migration[6.0]
  def change
    add_index :interests, %i[name interest_category_id], unique: true
  end
end
