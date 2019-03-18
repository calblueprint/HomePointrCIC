class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.integer :status
      t.boolean :read
      t.references :application, index: true
      t.timestamps
    end
  end
end
