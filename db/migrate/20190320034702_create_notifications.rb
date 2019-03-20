class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.boolean :read
      t.references :application
      t.timestamps
    end
  end
end
