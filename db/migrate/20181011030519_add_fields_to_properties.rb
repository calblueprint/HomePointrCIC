# frozen_string_literal: true

class AddFieldsToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :rent, :integer
    add_column :properties, :property_type, :integer
    add_column :properties, :housing_type, :integer
    add_column :properties, :date_available, :date
    add_column :properties, :location, :integer
  end
end
