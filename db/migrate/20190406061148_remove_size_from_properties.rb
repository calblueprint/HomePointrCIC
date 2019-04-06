class RemoveSizeFromProperties < ActiveRecord::Migration[5.2]
  def change
  	remove_column :properties, :size
  end
end
