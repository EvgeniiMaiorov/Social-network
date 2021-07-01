# frozen_string_literal: true

class AddLocationToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :location, :jsonb
  end
end
