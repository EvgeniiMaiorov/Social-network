class AddVisibilityColumnToPosts < ActiveRecord::Migration[6.0]
  def up
    add_column :posts, :visibility, :boolean, default: true
  end

  def down
    remove_column :posts, :visibility
  end
end
