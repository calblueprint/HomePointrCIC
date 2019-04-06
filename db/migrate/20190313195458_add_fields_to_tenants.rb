class AddFieldsToTenants < ActiveRecord::Migration[5.2]
  def change
  	add_column :tenants, :number_of_bathrooms, :integer
  	add_column :tenants, :mobility_aids, :boolean
  	add_column :tenants, :accessible_shower, :boolean
  	add_column :tenants, :car_parking, :boolean
  	add_column :tenants, :lift_access, :boolean
  end
end
