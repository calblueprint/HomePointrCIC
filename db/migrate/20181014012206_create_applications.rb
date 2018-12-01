class CreateApplications < ActiveRecord::Migration[5.2]
  def change
    create_table :applications do |t|
      t.integer :status
      t.text :description
      t.references :property, index: true
      t.references :info, index: true
      t.timestamps
    end
  end
end
