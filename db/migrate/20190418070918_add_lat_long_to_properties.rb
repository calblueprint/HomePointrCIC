class AddLatLongToProperties < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :lat, :float
    add_column :properties, :long, :float
  end
end
