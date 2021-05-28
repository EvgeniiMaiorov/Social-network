class RenamePhotoUrlToPhotoFromUsers < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :photo_url, :photo
  end
end
