class AddProviderIdentifierColunmToUsersAndAddIndexForProviderAndEmail < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :provider_identifier, :string
    remove_index :users, :email
    add_index :users, %i[email provider_identifier], unique: true
  end

  def down
    remove_index :users, %i[email provider_identifier]
    add_index :users, :email, unique: true
    remove_column :users, :provider_identifier
  end
end
