class CreateInterestCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :interest_categories do |t|
      t.string :category_name
      t.integer :interest_id

      t.timestamps
    end

    add_index :interest_categories, :category_name, unique: true
  end
end
