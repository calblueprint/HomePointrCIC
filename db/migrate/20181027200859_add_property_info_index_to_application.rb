class AddPropertyInfoIndexToApplication < ActiveRecord::Migration[5.2]
  def change
  	add_index :applications, [:info_id, :property_id], unique: true
  end
end
