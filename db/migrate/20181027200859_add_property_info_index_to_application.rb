# frozen_string_literal: true

class AddPropertyInfoIndexToApplication < ActiveRecord::Migration[5.2]
  def change
    add_index :applications, %i[info_id property_id], unique: true
  end
end
