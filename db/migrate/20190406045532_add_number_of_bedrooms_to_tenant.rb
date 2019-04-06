class AddNumberOfBedroomsToTenant < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :number_of_bedrooms, :integer
  end
end
