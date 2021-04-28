class CreateInterests < ActiveRecord::Migration[6.0]
  def change
    create_table :interests do |t|
      t.string :name
      t.integer :interest_category_id
      t.integer :user_id

      t.timestamps
    end
  end
end
