class AddAddressToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :address, :string
    add_column :properties, :lat, :float
    add_column :properties, :long, :float
  end
end
