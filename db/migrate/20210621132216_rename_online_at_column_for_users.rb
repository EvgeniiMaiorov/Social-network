# frozen_string_literal: true

class RenameOnlineAtColumnForUsers < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :online_at, :online_since
  end
end
