class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.integer :capacity
      t.text :description
      t.timestamps
    end
  end
end
