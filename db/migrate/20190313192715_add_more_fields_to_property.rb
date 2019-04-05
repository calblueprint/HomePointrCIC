class AddMoreFieldsToProperty < ActiveRecord::Migration[5.2]
  def change
  	add_column :properties, :number_of_bedrooms, :integer
  	add_column :properties, :number_of_bathrooms, :integer
  	add_column :properties, :floor_number, :integer
  	add_column :properties, :mobility_aids, :boolean
  	add_column :properties, :furniture, :boolean
  	add_column :properties, :utilities_included, :boolean
  	add_column :properties, :accessible_shower, :boolean
  	add_column :properties, :car_parking, :boolean
  	add_column :properties, :lift_access, :boolean
  end
end
