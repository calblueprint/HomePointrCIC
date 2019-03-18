class RemoveNumberOfBedroomsFromTenant < ActiveRecord::Migration[5.2]
  def change
    remove_column :tenants, :number_of_bedrooms
  end
end
