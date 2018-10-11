class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.integer :capacity
      t.text :description
      t.references :landlord, index: true
    end
  end
end
