# frozen_string_literal: true

class AddUserFeatures < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :phone, :string
    add_column :users, :type, :string
  end
end
